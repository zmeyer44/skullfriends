import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Head from "next/head";
import Header from "../landing/Header";
import Footer from "../landing/Footer";
import Button from "../landing/Button";
import Card from "../landing/Card";

export default function Home() {
  const router = useRouter();

  const { user } = useAuth();

  function renderSlide1() {
    return (
      <div className="flex flex-col items-center">
        <img
          src="/assets/images/cslogo.png"
          alt="Crypto Skulls"
          className="w-3/4 max-w-[400px] mt-5"
        />
        <h1 className="text-white text-[1.5em] font-player mt-10">
          SKULL FRIENDS
        </h1>
        <h2 className="bg-clip-text bg-gradient-to-r from-blue-300 via-pink-500 to-orange-300 text-transparent text-[2em] font-semibold mt-10">
          Events App
        </h2>
      </div>
    );
  }
  function renderSlide2() {
    return (
      <div className="flex flex-col items-center">
        <img
          src="/assets/images/skullnation.png"
          alt="Crypto Skulls"
          className="w-3/4 max-w-[400px] mt-5"
        />
        <h2 className="text-white text-[2.5em] font-semibold mt-10 w-3/4 text-center">
          <span className="bg-clip-text bg-gradient-to-r from-blue-300 via-pink-500 to-orange-300 text-transparent">
            Virtual +{" "}
          </span>{" "}
          IRL Events
        </h2>
      </div>
    );
  }
  function renderSlide3() {
    return (
      <div className="flex flex-col items-center">
        <img
          src="/assets/images/cslogo.png"
          alt="Crypto Skulls"
          className="w-3/4 max-w-[400px] mt-5"
        />
        <h1 className="text-white text-[1.5em] font-player mt-10">
          SKULL FRIENDS
        </h1>
        <h2 className="bg-clip-text bg-gradient-to-r from-blue-300 via-pink-500 to-orange-300 text-transparent text-[2em] font-semibold mt-10">
          Events App
        </h2>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Skull Friends</title>
        <meta name="description" content="Welcome to Skull Friends" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <div className="flex flex-col grow min-h-screen bg-black">
        <main className="relative flex flex-col items-center py-10 grow">
          {renderSlide1()}
          {user ? (
            <Link href={`/u/${user?.username}`}>
              <div className="center bg-gray-600 hover:bg-gray-700 transition-all cursor-pointer px-5 py-3 rounded-full text-white w-3/4 mt-auto">
                <span>My Profile</span>
              </div>
            </Link>
          ) : (
            <Link href="/signup">
              <div className="center bg-gray-600 hover:bg-gray-700 transition-all cursor-pointer px-5 py-3 rounded-full text-white w-3/4 mt-auto">
                <span>Start</span>
              </div>
            </Link>
          )}
        </main>
      </div>
    </>
  );
}
