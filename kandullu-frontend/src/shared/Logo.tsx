import Link from "next/link";
import React from "react";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-24" }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <img className="max-h-20" src={"/logo3.png"} alt="Logo-Light" />
    </Link>
  );
};

export default Logo;
