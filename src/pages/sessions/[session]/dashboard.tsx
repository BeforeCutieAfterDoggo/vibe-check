// pages/dashboard.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import VisualCards from "../../../components/Dashboard/VisualCards";
import {
  SessionProvider,
} from "../../../providers/SessionProvider";
import React, { useContext, useState } from "react";
import { SessionContext } from "../../../providers/SessionProvider";
import SessionPasswordInput from "../../../components/Questions/SessionPasswordInput";
import DashboardPage from "../../../components/Questions/DashboardPage";
const Dashboard: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover">

      <SessionProvider sessionId={router.query.session as string}>
        <DashboardPage />
      </SessionProvider>
    </div>
  );
};

export default Dashboard;
