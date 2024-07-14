"use client";
import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";

import Booking from "./Bookings";

function ManageSite() {
  let [pages] = useState(["Bookings"]);
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <div className="container relative space-y-24 py-4 mb-24 ">
        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {pages.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-primary-900 text-secondary-50"
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-primary-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="py-2">
                <Booking />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </main>
  );
}

export default ManageSite;
