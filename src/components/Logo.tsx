"use client";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className = "" }: LogoProps) {
  const LogoContent = () => (
    <div className="flex items-center">
      {/* Text with dot */}
      <div className="relative">
        <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent px-0.5">
          songify
        </h1>
        <div className="absolute top-1 -right-1 w-1 h-1 rounded-full bg-blue-500" />
      </div>
    </div>
  );

  if (!href) {
    return (
      <div className={`flex-shrink-0 ${className}`}>
        <LogoContent />
      </div>
    );
  }

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <Link href={href} className="inline-flex items-center">
        <LogoContent />
      </Link>
    </div>
  );
}
