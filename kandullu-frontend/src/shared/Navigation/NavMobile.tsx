"use client";

import { getVillaOptions, newsEventsChildMenus } from "@/data/navigation";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import SocialsList from "@/shared/SocialsList";
import ncNanoId from "@/utils/ncNanoId";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { map } from "lodash";
import Link from "next/link";
import React from "react";
import { NavItemType } from "./NavigationItem";

export interface NavMobileProps {
  data?: any;
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  const { data: options, isLoading, isError } = getVillaOptions();
  const navigationItems = [
    {
      id: ncNanoId(),
      href: "/",
      name: "Home",
      type: "megaMenu",
      isNew: true,
    },
    {
      id: ncNanoId(),
      name: "VILLAS & SUITES",
      type: "dropdown",
      children: map(options, (item) => ({
        id: ncNanoId(),
        href: `/listing-villa-detail/${item.id}`,
        name: item.title,
        type: "megaMenu",
        isNew: true,
      })),
    },
    {
      id: ncNanoId(),
      href: "/restaurant",
      name: "Restaurant",
    },
    {
      id: ncNanoId(),
      name: "NEWS & EVENTS",
      type: "dropdown",
      children: newsEventsChildMenus,
    },
    {
      id: ncNanoId(),
      href: "/about",
      name: "About",
    },
    {
      id: ncNanoId(),
      href: "/contact",
      name: "Contact",
    },
    {
      id: ncNanoId(),
      href: "/faq",
      name: "FAQ",
    },
  ];

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 cursor-pointer"
              href={i.href}
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <div
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          onClick={() => item.href && (window.location.href = item.href)}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </div>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <div className="nav_loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          {map(navigationItems, _renderItem)}
        </ul>
      )}
    </div>
  );
};

export default NavMobile;
