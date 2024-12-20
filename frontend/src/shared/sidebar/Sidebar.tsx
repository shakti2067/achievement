import { Fragment, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

import { navigation } from "../helper/sidebar";

import logo from "../../assets/images/logo.png";

// import { ReactComponent as CompanyLogo } from "../../assets/images/logo.png";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  const routeCheck = (route: string) => {
    if (pathname.includes(route)) {
      return true;
    } else if (route === "/dashboard" && pathname === "/") {
      return true;
    }

    return pathname === route;
  };

  return (
    <>
      <button
        type="button"
        className="p-2.5 text-seashell lg:hidden absolute top-[10px] left-2 z-[111]"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>*
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* <CompanyLogo /> */}
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={clsx("sidebarList", {
                                    sidebarListActive: routeCheck(
                                      item.activeMenu
                                    ),
                                  })}
                                >
                                  <item.icon
                                    className={clsx(
                                      item.current
                                        ? "text-[#49263d]"
                                        : "text-gray-400 group-hover:text-[#49263d]",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-oldBurgundy dark:border-blue-500 bg-seashell px-4 pb-4 dark:bg-slate-800 dark:text-white">
            <div className="flex h-16 shrink-0 items-center mt-2">
              <img src={logo} alt="logo-img" className="w-44" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx("sidebarList", {
                            sidebarListActive: routeCheck(item.activeMenu),
                          })}
                        >
                          <item.icon
                            className={clsx(
                              item.current
                                ? "text-[#49263d]"
                                : "text-gray-400 group-hover:text-[#49263d]",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
