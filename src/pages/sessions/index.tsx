import React, { useState } from "react";
declare const window: any;
import { Skeleton } from "antd";
import GroupCard from "../../components/GroupCard";
import Fuse from "fuse.js";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useSessions from "../../hooks/useSessions";
export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sessions] = useSessions();

  const allSessions = sessions?.docs.map((doc) => {
    return { ...doc.data(), sessionId: doc.id };
  });
  console.log(allSessions);
  const fuse = new Fuse(allSessions!, {
    keys: ["sessionName", "description"],
    // threshold: 0.3,
  });
  let searchResults = null;
  if (allSessions) {
    const results = fuse.search(searchTerm);
    searchResults = searchTerm
      ? results.map((result: any) => result.item)
      : allSessions;
  }

  function handleOnSearch({ currentTarget = {} }: any) {
    const { value } = currentTarget;
    setSearchTerm(value);
  }

  return (
    <>
      {/* <MainPage> */}

      <div className="relative h-screen w-screen flex justify-center">
        <img
          className="absolute top-0 left-0 w-full h-full blur-sm"
          src="images/bg2.png"
        />
        <Link href="/">
          <h1 className="absolute antialiased mt-4 underline decoration-wavy decoration-4 tracking-wide top-0 left-0 text-white text-5xl font-serif italic  left-1/2 transform -translate-x-1/2 translate-y-2/4 ">
            Vibe Check
          </h1>
        </Link>
        <form className="absolute mt-32 w-full px-32">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-white sr-only "
          >
            Search Group
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleOnSearch}
              id="default-search"
              className="block p-4 pl-10 w-full text-lg text-white bg-gradient-to-r from-[#DF617B] to-[#F5D1C5]  border border-2 border-white rounded-3xl focus:ring-[#5FFF37] focus:border-[#5FFF37] placeholder:text-white placeholder:italic"
              placeholder="Search Group..."
              required
            />
          </div>
        </form>

        {!allSessions && (
          <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4 xl:gap-x-10 grid-cols-1 pt-10 px-10 ">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
        <div className=" absolute mt-48 grid gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4 xl:gap-x-10 grid-cols-1 pt-10 px-10 ">
          {allSessions &&
            searchResults &&
            searchResults.map((item: any) => (
              <div
                key={item.sessionName}
                className="border border-2 border-white hover:border-[#5FFF37] rounded-3xl w-full"
              >
                <GroupCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
