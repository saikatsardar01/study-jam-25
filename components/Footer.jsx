"use client";
import Image from 'next/image';


import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // Show scroll-to-top button after scrolling 400px
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-black text-white py-10 mt-20 border-t border-gray-800 overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-10 pointer-events-none">
        {[...Array(120)].map((_, i) => (
          <div key={i} className="border border-gray-800" />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* GDG Logo */}

        <img
          src="/gdgc.png"
          alt="GDG Logo"
          className="h-10 sm:h-12 mb-3"
        />

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold">
          Google Developer Groups
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          <span className="text-blue-400">On Campus</span> · Meghnad Saha Institute Of Technology
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 mt-6 text-2xl">
          <a href="https://www.facebook.com/GDSCMSITKol" className="hover:text-blue-500 transition"><FaFacebookF /></a>
          <a href="https://www.instagram.com/gdgc_msit/" className="hover:text-pink-500 transition"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/google-developer-group-on-campus-msit" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
          <a href="https://x.com/gdg_msit" className="hover:text-sky-400 transition"><FaTwitter /></a>
          <a href="https://gdgcmsit.netlify.app/" className="hover:text-green-400 transition"><FaGlobe /></a>
        </div>
      </div>

      {/* Scroll-to-top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-900/80 hover:bg-gray-800 text-white p-4 rounded-full shadow-lg border border-gray-700 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  );
}
