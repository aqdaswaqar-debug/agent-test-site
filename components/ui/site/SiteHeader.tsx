"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Heart, Menu, Phone, Search, ShoppingCart, UserRound } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { iconBtn, siteThemeClass, type SiteTheme } from "./site-styles";
import { NAV, SITE } from "./site-links";

const SearchDialog = dynamic(() => import("./HeaderDialogs").then((m) => m.SearchDialog), { ssr: false });
const MenuDrawer = dynamic(() => import("./HeaderDialogs").then((m) => m.MenuDrawer), { ssr: false });

function CartButton() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartCount(items);
  return (
    <button type="button" className={iconBtn} onClick={() => setOpen(true)} aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
      <ShoppingCart aria-hidden size={22} />
      {count > 0 ? (
        <span aria-hidden className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-(--site-accent-strong) px-1 text-[10px] leading-none font-semibold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}

type SiteHeaderProps = {
  theme?: SiteTheme;
  /** NAV label to mark as the current section. */
  activeNav?: string;
  /** Page-specific wishlist control (e.g. the PDP's save button). Defaults to a link to the account. */
  wishlist?: ReactNode;
};

/** Berkowits site header: sticky, desktop nav + icons, mobile menu/search drawers (Figma 7132:454 / 3:54). */
export function SiteHeader({ theme = "teal", activeNav, wishlist }: SiteHeaderProps) {
  const [menuOpen, setMenuOpenState] = useState(false);
  const [searchOpen, setSearchOpenState] = useState(false);
  // Download and mount each dialog the first time it is needed (keeps Headless UI dialog code out of the first load).
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const setMenuOpen = (v: boolean) => {
    if (v) setMenuLoaded(true);
    setMenuOpenState(v);
  };
  const setSearchOpen = (v: boolean) => {
    if (v) setSearchLoaded(true);
    setSearchOpenState(v);
  };

  return (
    <header className={cn(siteThemeClass(theme), "sticky top-0 z-40 rounded-b-[6px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.18)] lg:rounded-b-[18px]")}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-2 px-3 md:px-6 lg:h-[96px] lg:gap-6 lg:px-6 xl:px-8">
        {/* Mobile: menu + search on the left, logo centred, account + cart on the right (Figma 7132:454). */}
        <div className="flex items-center lg:hidden">
          <button type="button" className={iconBtn} onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu aria-hidden size={22} />
          </button>
          <button type="button" className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search aria-hidden size={20} />
          </button>
        </div>

        <a href={SITE.home} className="mx-auto shrink-0 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--site-accent) lg:mx-0">
          <Image src="/images/local-seo/berkowits-logo-dark.png" alt="Berkowits Hair & Skin Clinic" width={429} height={101} className="h-7 w-auto lg:h-12" />
        </a>

        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-4">
            {NAV.map((item) => {
              const active = item.label === activeNav;
              return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative block rounded-[6px] px-2 py-2 text-[15px] text-black xl:px-2.5 xl:text-[16px] focus-visible:outline-2 focus-visible:outline-(--site-accent)"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-(--site-accent-strong) transition-[scale] duration-200",
                      active ? "scale-x-100" : "scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center lg:gap-1">
          <button type="button" className={cn(iconBtn, "hidden lg:grid")} onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search aria-hidden size={22} />
          </button>
          <a href={SITE.login} className={cn(iconBtn, "xl:hidden")} aria-label="Log in or sign up">
            <UserRound aria-hidden size={21} />
          </a>
          <CartButton />
          <a href={`tel:${SITE.phoneTel}`} className={cn(iconBtn, "hidden lg:grid")} aria-label={`Call ${SITE.phoneDisplay}`}>
            <Phone aria-hidden size={21} />
          </a>
          {wishlist ?? (
            <a href={SITE.login} className={cn(iconBtn, "hidden lg:grid")} aria-label="Wishlist (log in to view)">
              <Heart aria-hidden size={22} />
            </a>
          )}
          <a
            href={SITE.login}
            className="ml-3 hidden shrink-0 rounded-[6px] bg-(--site-accent-strong) px-5 py-2.5 text-[17px] text-white transition-[background-color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--site-accent) xl:block [@media(hover:hover)]:hover:bg-(--site-accent-hover)"
          >
            Login/signup
          </a>
        </div>
      </div>

      {menuLoaded ? <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} theme={theme} activeNav={activeNav} /> : null}
      {searchLoaded ? <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} theme={theme} /> : null}
    </header>
  );
}
