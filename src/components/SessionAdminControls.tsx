import { Button } from "antd";
import React from "react";
import { Session } from "../types";

const ToggleSessionButton = ({ active }: { active: boolean }) => {
  return (
    <Button type={active ? "primary" : "default"} danger={active}>
      {active ? "End Session" : "Start Session"}
    </Button>
  );
};

const SessionAdminControls = ({ session }: { session: Session }) => {
  return (
    <div>
      <ToggleSessionButton active={session.active} />
    </div>
  );
};

export default SessionAdminControls;
