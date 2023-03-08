// pages/dashboard.tsx
import { useRouter } from "next/router";
import {
  SessionProvider,
} from "../../../providers/SessionProvider";
import React from "react";
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
