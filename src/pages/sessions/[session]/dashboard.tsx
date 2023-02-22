// pages/dashboard.tsx

import { useRouter } from "next/router";
import React from "react";
import VisualCards from "../../../components/Dashboard/VisualCards";
import {
  SessionProvider,
} from "../../../providers/SessionProvider";
const Dashboard: React.FC = () => {
  const router = useRouter();
  

  return (
    <SessionProvider sessionId={router.query.session as string}>
      <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover ">
        <div className="container mx-auto p-8">
          <div className=" mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-white text-5xl font-bold mb-8 underline decoration-wavy decoration-4 tracking-wide italic font-serif text-center">
              Vibeboard
            </h1>
          </div>
          <main className=" mx-auto  sm:px-6 lg:px-8 ">
            <VisualCards />
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Dashboard;
