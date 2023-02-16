import Link from "next/link";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
export default function GroupCard(props: any) {
  const { item } = props;
  console.log(item);
  return (
    <>
      <Link href={`/sessions/${item.sessionId}`}>
        <div
          style={{ cursor: "pointer" }}
          className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white"
        >
          <img
            className="w-full rounded-3xl "
            src={item.cover ? item.cover : "/images/bg3.png"}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.sessionName}</div>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
