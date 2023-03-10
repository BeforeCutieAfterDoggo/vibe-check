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
  const sessions = useSessions();
  const fuse = new Fuse(sessions!, {
    keys: ["sessionName", "description"],
    // threshold: 0.3,
  });
  let searchResults = null;
  if (sessions) {
    const results = fuse.search(searchTerm);
    searchResults = searchTerm
      ? results.map((result: any) => result.item)
      : sessions;
  }

  function handleOnSearch({ currentTarget = {} }: any) {
    const { value } = currentTarget;
    setSearchTerm(value);
  }

  return (
    <>
      {/* <MainPage> */}

      <div className="bg-[url('/images/bg2.png')] bg-fixed bg-center bg-cover min-h-screen">
        <div className="relative">
          <Link href="/">
            <h1 className="flex justify-center pt-16 underline decoration-wavy decoration-4 tracking-wide text-white text-4xl md:text-5xl font-serif italic    ">
              Vibe Check
            </h1>
          </Link>
          <form className="  w-full px-16 md:px-32">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-white sr-only "
            >
              Search Group
            </label>
            <div className="mt-10">

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

          <div className=" grid gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4 xl:gap-x-10 grid-cols-1 mt-10 px-10 ">
            {sessions &&
              searchResults &&
              searchResults.map((item: any) => (
                <div
                  key={item.sessionName}
                >
                  <GroupCard item={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
