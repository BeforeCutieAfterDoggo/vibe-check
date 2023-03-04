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
      <div className="flex  h-screen items-center justify-center text-center">
        <div className="flex flex-col">
          <input className="p-2 rounded-xl italic font-serif"  placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="mt-3 text-white font-serif font-bold bg-black p-2 rounded-xl" onClick={checkPassword}>Join Session</button>
        </div>
      </div>

    </>
  );
};

export default SessionPasswordInput;
