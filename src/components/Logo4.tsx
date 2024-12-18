import Link from "next/link";

interface Logo4Props {
  href?: string;
  className?: string;
}

export function Logo4({ href = "/", className = "" }: Logo4Props) {
  const LogoContent = () => (
    <div className="flex items-center">
      {/* Geometric Music Icon */}
      <div className="relative w-10 h-10 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 rounded-lg transform -rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 via-blue-600 to-cyan-500 rounded-lg transform rotate-12 opacity-75" />
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-10 h-10 p-2 text-white"
          fill="currentColor"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>

      {/* Brand Text */}
      <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
        songify
      </h1>
    </div>
  );

  if (!href) {
    return (
      <div className={`flex-shrink-0 group ${className}`}>
        <LogoContent />
      </div>
    );
  }

  return (
    <div className={`flex-shrink-0 group ${className}`}>
      <Link href={href} className="inline-flex items-center">
        <LogoContent />
      </Link>
    </div>
  );
}
