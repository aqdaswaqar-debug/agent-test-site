#!/usr/bin/env node
// PreToolUse guard for the Bash tool (docs/SOP.md Section 6, Lock 2).
// Blocks: any push that is not a plain push to origin/main, force pushes and branch deletes,
// history rewrites, rm -rf, curl/wget,
// and reading .env files (except .env.example).
// Exit code 2 blocks the command and shows the reason to Claude.
import { execFileSync } from "node:child_process";

const PROTECTED = new Set([]); // single-branch test repo: no protected branches
const WORK_BRANCH = "main";
const ALLOWED_REFSPECS = new Set([
  WORK_BRANCH,
  `HEAD:${WORK_BRANCH}`,
  `${WORK_BRANCH}:${WORK_BRANCH}`,
  `refs/heads/${WORK_BRANCH}`,
  `HEAD:refs/heads/${WORK_BRANCH}`,
]);
const SAFE_PUSH_FLAGS = new Set(["-u", "--set-upstream", "-q", "--quiet", "-v", "--verbose", "--progress"]);

function block(reason) {
  process.stderr.write(`Blocked by .claude/hooks/guard-git.mjs: ${reason}\n`);
  process.exit(2);
}

function tokenize(segment) {
  const tokens = [];
  let cur = "";
  let quote = null;
  for (const ch of segment) {
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
    } else if (/\s/.test(ch)) {
      if (cur) tokens.push(cur), (cur = "");
    } else {
      cur += ch;
    }
  }
  if (cur) tokens.push(cur);
  return tokens;
}

function currentBranch(cwd) {
  try {
    return execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

function checkGit(tokens, cwd) {
  // skip leading env assignments and the "git" token, then git's global options
  let i = tokens.indexOf("git");
  if (i === -1) return;
  i += 1;
  let gitCwd = cwd;
  while (i < tokens.length && tokens[i].startsWith("-")) {
    if (tokens[i] === "-C") { gitCwd = tokens[i + 1]; i += 2; continue; }
    if (tokens[i] === "-c") { i += 2; continue; }
    i += 1;
  }
  const sub = tokens[i];
  const args = tokens.slice(i + 1);

  if (sub === "push") {
    const positionals = [];
    for (const a of args) {
      if (a.startsWith("-")) {
        if (!SAFE_PUSH_FLAGS.has(a)) block(`"git push ${a}" is not allowed. Only "git push origin ${WORK_BRANCH}" is permitted (no force, delete, mirror, tags or all).`);
      } else positionals.push(a);
    }
    const [remote, ...refspecs] = positionals;
    if (remote !== "origin" || refspecs.length === 0) {
      block(`push must name the remote and branch explicitly: "git push origin ${WORK_BRANCH}".`);
    }
    for (const r of refspecs) {
      if (!ALLOWED_REFSPECS.has(r)) block(`pushing "${r}" is not allowed. The agent may push only to ${WORK_BRANCH}.`);
    }
    return;
  }

  if (sub === "reset" && args.includes("--hard")) block("git reset --hard is not allowed. Undo with git revert.");
  if (sub === "rebase") block("git rebase is not allowed. Never rewrite history; undo with git revert.");
  if (sub === "branch" && args.some((a) => a === "-D" || a === "--delete" || a === "-d" || a === "-M" || a === "-m")) {
    block("deleting or renaming branches is not allowed.");
  }
  if (sub === "filter-branch" || sub === "filter-repo") block("history rewriting is not allowed.");

  if (["commit", "merge", "cherry-pick", "am", "revert", "pull"].includes(sub)) {
    const branch = currentBranch(gitCwd);
    if (PROTECTED.has(branch)) {
      block(`you are on "${branch}". Switch to ${WORK_BRANCH} first.`);
    }
  }
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input = {};
  try {
    input = JSON.parse(raw || "{}");
  } catch {
    process.exit(0);
  }
  const cmd = String(input?.tool_input?.command ?? "");
  const cwd = input?.cwd || process.cwd();
  if (!cmd) process.exit(0);

  // .env files (but not .env.example)
  if (/(?:^|[\s'"=<>:/(])\.env(?:\.(?!example\b)[\w.-]+)?(?=$|[\s'";|&)>])/.test(cmd)) {
    block("reading or touching .env files is not allowed. Use variable names from .env.example only; never read or print values.");
  }

  for (const segment of cmd.split(/&&|\|\||;|\||\n/)) {
    const tokens = tokenize(segment.trim());
    if (tokens.length === 0) continue;
    const head = tokens[0];
    if ((head === "rm" || tokens.includes("rm")) && tokens.some((t) => /^-[a-zA-Z]*r[a-zA-Z]*f|^-[a-zA-Z]*f[a-zA-Z]*r/.test(t))) {
      block("rm -rf is not allowed. Ask the developer before deleting files.");
    }
    if (head === "curl" || head === "wget") block("network requests with curl/wget are not allowed (SOP Section 7.9).");
    if (tokens.includes("git")) checkGit(tokens, cwd);
  }
  process.exit(0);
});
