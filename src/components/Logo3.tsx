import Link from "next/link";

interface Logo3Props {
  href?: string;
  className?: string;
}

export function Logo3({ href = "/", className = "" }: Logo3Props) {
  const LogoContent = () => (
    <div className="relative">
      <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent px-0.5">
        songify
      </h1>
      <div className="absolute -right-1 top-1.5 w-1 h-1 rounded-full bg-blue-500 group-hover:scale-110 transition-transform" />
      <span className="absolute -bottom-2 right-0 text-[10px] tracking-wider font-medium text-stone-400 uppercase">
        beta
      </span>
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
