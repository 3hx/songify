import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({
  children,
  onClick,
  className = "",
  style = {},
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`transition-all duration-300 cursor-pointer shadow-[0_0_32px_rgba(0,0,0,0.2)] backdrop-blur-[10px] border-[#e5e7eb] h-[28rem] w-[322px] mx-auto rounded-xl text-3xl text-white overflow-hidden ${className}`}
      style={style}
    >
      <div className="">{children}</div>
    </div>
  );
}
