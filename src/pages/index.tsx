import Link from "next/link";
import Head from "next/head";

const HomePage = () => {
  return (
    <div className="h-screen bg-white flex flex-col justify-center items-center">
      <Head>
        <title>Vibe Check</title>
      </Head>
      <img
        src="/images/bg.png"
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover blur-sm "
      />
      <div className="relative z-10">
        <h1 className="text-white text-5xl font-bold mb-8 underline decoration-wavy decoration-4 tracking-wide italic font-serif">
          Vibe Check
        </h1>
        <div className="flex space-x-4">
          <Link href="/sessions">
            <button className="border border-white text-white py-2 px-4 rounded-lg">
              Explore
            </button>
          </Link>
          <Link href="/create">
            <button className="bg-white text-black py-2 px-4 rounded-lg">
              Create Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
