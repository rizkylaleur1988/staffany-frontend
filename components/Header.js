import React, { Fragment } from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between py-4 px-4 border-b-2 border-gray-100">
      <div>
        <Link href="/">
          <a>
            <span className="sr-only">StaffAny</span>
            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
          </a>
        </Link>
      </div>
      <nav className="space-x-10 place-self-center">
        <Link href="/dashboard">
          <a className="text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</a>
        </Link>
        <Link href="/shift">
          <a className="text-base font-medium text-gray-500 hover:text-gray-900">Shift</a>
        </Link>
      </nav>
    </div>
  );
}
