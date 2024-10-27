import { Fragment, useRef, useState } from "react";
import { capitalizeFirstLetter, removeItemInCookie } from "../helper/util";
import { TOKEN } from "../helper/constant";
import { Menu, Transition } from "@headlessui/react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";
import { useUser } from "../provider/user-provider/UserProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user }: any = useUser();

  const profileRef = useRef(null);

  const navigate = useNavigate();

  // for dark mode
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const onClickProfile = () => {
    navigate(`/profile`);
    setMenuOpen(false);
  };

  const onClickLogout = () => {
    removeItemInCookie(TOKEN);
    navigate("/admin/login");
    setMenuOpen(false);
  };

  useOutsideClick(profileRef, () => {
    setMenuOpen(false);
  });

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-blue-500 bg-white dark:bg-slate-800 dark:text-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* <button
          className="w-6 dark_light--icon"
          onClick={() => darkModeHandler()}
        >
          {dark && <SunIcon />}
          {!dark && <MoonIcon />}
        </button> */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" className="relative">
            <Menu.Button
              ref={profileRef}
              className="-m-1.5 flex items-center justify-center p-2 rounded-[50%] bg-[#eee] dark:bg-blue-500 border border-slate-800 dark:border-blue-400 w-10 h-10"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {capitalizeFirstLetter(user?.email)}
            </Menu.Button>
            <Transition
              as={Fragment}
              show={menuOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white dark:bg-blue-500 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {() => (
                    <>
                      <button
                        type="button"
                        onClick={() => onClickProfile()}
                        className={
                          "flex items-center gap-2 px-4 py-2 text-sm leading-6 text-gray-900 dark:text-white w-full text-left hover:bg-[#eee] dark:hover:bg-blue-400 capitalize transition"
                        }
                      >
                        Profile
                      </button>
                      <button
                        type={"button"}
                        onClick={() => onClickLogout()}
                        className={
                          "flex items-center gap-2 px-4 py-2 text-sm leading-6 text-gray-900 dark:text-white w-full text-left hover:bg-[#eee] dark:hover:bg-blue-400 capitalize transition"
                        }
                      >
                        Logout
                      </button>
                    </>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
