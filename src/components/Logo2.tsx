import Link from "next/link";

interface Logo2Props {
  href?: string;
  className?: string;
}

export function Logo2({ href = "/", className = "" }: Logo2Props) {
  const LogoContent = () => (
    <div className="relative flex items-center">
      {/* Icon */}
      <div className="relative mr-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />
        <div className="absolute inset-0 w-8 h-8 bg-blue-600 rounded-lg -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-8 h-8 text-white p-1.5"
          fill="currentColor"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>

      {/* Text */}
      <div>
        <p className="text-sm font-medium text-blue-600 -mb-1">AI-Powered</p>
        <h1 className="text-2xl font-black tracking-tight">songify</h1>
      </div>
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
    <div className={`flex-shrink-0 ${className}`}>
      <Link href={href} className="group inline-flex items-center">
        <LogoContent />
      </Link>
    </div>
  );
}
