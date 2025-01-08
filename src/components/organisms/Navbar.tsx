import React from "react";
import AuthButtons from "@/components/molecules/AuthButtons";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <Link href="/" className={`font-bold text-2xl text-text-color`}>
        Eu Cuido
      </Link>
      <AuthButtons />
    </nav>
  );
};

export default Navbar;