"use client";

import { useState, useEffect } from "react";

import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import Example from "../utils/dropdown";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./button";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          <nav className="hidden md:flex ">

            <div className="flex w-32 justify-end gap-3">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                {/* <MobileNav /> */}
                <Example />
              </SignedIn>
            </div>
          </nav>

          <div className="flex md:hidden gap-1">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <Example />
            </SignedIn>

            <SignedOut>
              <Button className="rounded-full bg-blue-600">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
