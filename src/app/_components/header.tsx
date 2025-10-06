"use client";
import Link from "next/link";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./logo";

export default function StickyHeader() {
  useEffect(() => {
    const stickyElm = document.querySelector("header");

    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
      { threshold: [1] },
    );

    if (stickyElm) {
      observer.observe(stickyElm);
    }

    return () => {
      if (stickyElm) {
        observer.unobserve(stickyElm);
      }
    };
  }, []);

  return (
    <header>
      <div className="header-contents">
        <Link href="/">
          <div className="branding gap-6">
            {/*<div class="w-[50px] h-[50px]">*/}
            <Logo />
            {/*</div>*/}

            <span className="brand-name">
              <p>HyperPrints</p>
            </span>
          </div>
        </Link>

        <div className="categories h-full items-center gap-2 hidden md:flex">
          <Link href="shop">shop</Link>
          <Link href="studio">studio</Link>
          <Link href="equipment">equipment</Link>
          <Link href="support">support</Link>
        </div>

        <div className="account h-full items-center gap-2 hidden md:flex">
          <Link href="login">login</Link>
          <Link href="signup">sign up</Link>
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary">
                  Are you absolutely sure?
                </SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
