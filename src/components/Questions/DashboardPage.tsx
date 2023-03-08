import React, { useContext, useState } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import SessionPasswordInput from "./SessionPasswordInput";
import Link from "next/link";
import VisualCards from "../Dashboard/VisualCards";
import { useRouter } from "next/router";
const DashboardPage = () => {
    const [allowed, setAllowed] = useState(false);
    const session = useContext(SessionContext);
    if (!session?.session) {
        return <div>Loading...</div>;
    }
    const router = useRouter();
    const link = router.asPath;
    const result = link.slice(0, link.lastIndexOf('/'));

    return (
        <div className="relative">
            {(session.session?.password &&
                session.session.password !== "" &&
                !allowed) ? (
                <SessionPasswordInput setAllowed={setAllowed} />
            ) : (
                <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover min-h-screen">
                    <div className="container mx-auto p-8">
                        <div className=" mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-white text-5xl font-bold mb-8 underline decoration-wavy decoration-4 tracking-wide italic font-serif text-center">
                                Vibeboard
                            </h1>
                            <div className="flex justify-center mb-10">
                                <Link href={`/${result}`}>
                                    <button className="bg-black text-white font-bold py-2 px-4 font-serif rounded-full mr-4">Back to Session</button>
                                </Link>
                                <Link href={`/`}>
                                    <button className="bg-black text-white font-bold py-2 px-4 font-serif rounded-full">Home</button>
                                </Link>
                            </div>
                        </div>
                        <main className=" mx-auto  sm:px-6 lg:px-8 ">
                            <VisualCards />
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
