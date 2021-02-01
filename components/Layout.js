import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children, headerName }) {
  return (
    <div className="font-sans antialiased">
      <Head>
        <title>StaffAny :: {headerName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">{headerName}</h2>
          </div>
        </header>
        <main>
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
