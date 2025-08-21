"use client";

import DataObjectIcon from "@mui/icons-material/DataObject";
import { mainColor } from "@/Color";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <hr />
      <CTASection />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 item-center justify-between max-sm:flex-col">
      <Logo />
      <Button />
    </div>
  )
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div style={{ backgroundColor: mainColor }} className={"p-[6px] rounded-md"}>
        <DataObjectIcon sx={{ fontSize: 27, color: "black" }} />
      </div>
      <div className="flex gap-1 text-[19px]">
        <span style={{ color: mainColor }} className={`font-bold `}>Snip Hub</span>
      </div>
    </div>
  )
}

function Button() {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ?
        (
          <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
            <Link href="/my-notes">
              <button className="mx-sm:w-full bg-[#8338ec] p-[8px] px-6 text-sm text-white rounded-md cursor-pointer">Access To The App</button>
            </Link>
          </div>
        )
        : (<div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
          <Link href="/sign-in">
            <button style={{ backgroundColor: mainColor }} className={`max-sm:w-full p-[8px] px-6 text-sm text-white rounded-md cursor-pointer`}>
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className={`text-sm border border-[#8338ec] text-[#8338ec] hover:bg-[#8338ec] hover:text-white p-[8px] px-6 rounded-md cursor-pointer max-sm:w-full`}>
              Sign Up
            </button>
          </Link>
        </div>)}
    </div>
  )
}

function CTASection() {
  const { userId } = useAuth();
  return (
    <div
      className="relative w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <h2 className="font-bold text-2xl text-white">
          Organize Your Code Snippets
        </h2>
        <p className="text-gray-200 text-sm w-[450px] max-sm:w-full">
          SnipHub is a platform designed to help you store, organize, and share
          your code snippets with ease.
        </p>
        {userId ? (
          <Link href="/my-notes">
            <button className="bg-[#8338ec] p-[8px] px-6 text-sm text-white rounded-md cursor-pointer">
              Access To The App
            </button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <button
              className="block px-9 py-3 text-sm font-medium text-white transition focus:outline-none rounded-md cursor-pointer"
              style={{ backgroundColor: mainColor }}
              type="button"
            >
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

