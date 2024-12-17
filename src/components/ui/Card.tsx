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
      className={`transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] backdrop-blur-[10px] border-[#e5e7eb] rounded-xl overflow-hidden ${className}`}
      style={style}
    >
      <div>{children}</div>
    </div>
  );
}
