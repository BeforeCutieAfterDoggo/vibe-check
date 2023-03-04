import { useContext, useState } from "react";
import Head from "next/head";
import { handleAxiosError } from "../lib/fetcher";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";
import axios from "axios";
import { useRouter } from "next/router";
const CreateSessionPage = () => {
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");
  const [sessionPassword, setSessionPassword] = useState("");
  const user = useContext(AnonymousUserContext);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!user) return;
    try {
      const id = await axios.post("/api/session", {
        sessionName,
        description,
        password: sessionPassword,
      });
      setSessionName("");
      setDescription("");
      setSessionPassword("");
      router.push(`sessions/${id.data.sessionId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleCancel = () => {
    setSessionName("");
    setDescription("");
    router.push("/");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center font-serif">
      <img
        src="/images/bg.png"
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover blur-md "
      />
      <Head>
        <title>Create Session</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4 z-10 text-white italic underline decoration-wavy decoration-4 tracking-wide">
        Create Session
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md w-full z-10">
        <div className="mb-4">
          <label
            htmlFor="sessionName"
            className="block text-white font-bold mb-2 "
          >
            Session Name
          </label>
          <input
            type="text"
            id="sessionName"
            name="sessionName"
            value={sessionName}
            onChange={(event) => setSessionName(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-bold mb-2"
          >
            Session Password (Optional)
          </label>
          <input
            id="sessionPassword"
            name="sessionPassword"
            value={sessionPassword}
            onChange={(event) => setSessionPassword(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="border border-white text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border border-white bg-white text-black py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionPage;
