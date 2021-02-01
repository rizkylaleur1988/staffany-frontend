import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const route = router.route;
  const [openHamburger, setOpenHamburger] = useState(false);
  //   console.log("route: ", route, "include: ", route.includes("/shift/create"));
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  className="cursor-pointer h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <Link href="/">
                <span
                  className={`cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                    route === "/"
                      ? "border-indigo-400 text-gray-900 focus:border-indigo-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                  }`}
                >
                  Dasboard
                </span>
              </Link>
              <Link href="/shift">
                <span
                  className={`cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                    route.includes("/shift")
                      ? "border-indigo-400 text-gray-900 focus:border-indigo-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                  }`}
                >
                  Shift
                </span>
              </Link>
            </div>
          </div>
          {/* <!-- Hamburger --> */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpenHamburger(!openHamburger)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={`${openHamburger ? "hidden" : "inline-flex"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${openHamburger ? "inline-flex" : "hidden"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Responsive Navigation Menu --> */}
      <div className={`${openHamburger ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/">
            <span
              className={`cursor-pointer block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${
                route === "/"
                  ? "border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
              }`}
            >
              Dashboard
            </span>
          </Link>
          <Link href="/shift">
            <span
              className={`cursor-pointer block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${
                route.includes("/shift")
                  ? "border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
              }`}
            >
              Shift
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
