"use client";

import Link from "next/link";
import { navLink } from "./menu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import SignIn from "../sign_in/page";
import SignOut from "../sign-out/page";

export default function NavbarComponent() {
  const data = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  console.log('data :>> ', data);
  useEffect(() => {
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggle && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle("hidden");
      };
      toggle.addEventListener("click", handleClick);

      // Cleanup event listener on unmount
      return () => {
        toggle.removeEventListener("click", handleClick);
      };
    }
  }, []);
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* <!-- Logo --> */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            MyBrand
          </div>

          {/* <!-- Desktop Menu --> */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`${
                  pathname === item.path ? "text-amber-300" : ""
                }hover:text-yellow-300 transition`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* <!-- Desktop Button --> */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold"
              >
                Get Started
              </a>
              <SignIn/>
              <SignOut/>
              <Link href={"/cart"} className="relative flex items-center group">
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                  {data.itemsCount}
                </span>
                <ShoppingCart className="text-white w-9 h-9 drop-shadow-lg group-hover:text-rose-400 transition-colors" strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          {/* <!-- Mobile Menu Button --> */}
          <div className="md:hidden">
            <button
              id="menu-toggle"
              className="text-white focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile Menu --> */}
      <div
        id="mobile-menu"
        className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium"
      >
        {navLink.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`${
              pathname === item.path ? "text-black" : ""
            }hover:text-yellow-300 transition`}
          >
            {item.name}
          </Link>
        ))}
        <a
          href="#"
          className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
