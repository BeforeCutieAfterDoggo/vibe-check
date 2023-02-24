import { Button, Input } from "antd";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";

const SessionPasswordInput = ({
  setAllowed,
}: {
  setAllowed: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useContext(SessionContext);
  const [password, setPassword] = React.useState("");
  const checkPassword = () => {
    if (!session?.session?.password) {
      setAllowed(true);
    } else if (password === session.session.password) {
      setAllowed(true);
    } else {
      alert("Incorrect password");
    }
  };
  return (
    <>
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={checkPassword}>Join Session</Button>
    </>
  );
};

export default SessionPasswordInput;
