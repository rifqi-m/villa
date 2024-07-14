"use client";

import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "@/shared/ButtonPrimary";

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = (window as any).pageYOffset;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const [auth, setAuth] = useState<any>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  //
  const [showHeroSearch, setShowHeroSearch] = useState<any | null>();
  //
  const [currentTab, setCurrentTab] = useState<any>("Stays");

  //
  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null);
    setCurrentTab("Stays");
  });

  let pathname = usePathname();
  //

  useEffect(() => {
    setShowHeroSearch(null);
    setAuth(JSON.parse(localStorage.getItem("auth") || "null"));
  }, [pathname]);

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm);
  };

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) {
      return;
    }
    //
    let currentScrollPos = window.pageYOffset;
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null);
    } else {
      return;
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  //

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] ${
          showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${showHeroSearch ? "duration-75" : ""} 
          ${
            showHeroSearch
              ? currentTab === "Cars" || currentTab === "Flights"
                ? "scale-y-[4.4]"
                : "scale-y-[3.4]"
              : ""
          }`}
        ></div>
        <div className="relative px-4 lg:container h-[88px] flex">
          <div className="flex-1 flex justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 flex flex-1 items-center">
              <Logo />
            </div>
            {/* NAV */}
            <div className="flex md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className=" flex space-x-1">
                {auth?.token ? (
                  <AvatarDropdown />
                ) : (
                  <span className="flex items-center">
                    <ButtonPrimary
                      className="rounded-full flex items-center"
                      href={"/login" as any}
                    >
                      {" "}
                      Login{" "}
                    </ButtonPrimary>
                  </span>
                )}
                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
