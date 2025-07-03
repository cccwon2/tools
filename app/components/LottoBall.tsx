"use client";

import React from "react";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg";
}

const getNumberColor = (number: number): string => {
  if (number <= 10) return "#FBC400"; // 노랑
  if (number <= 20) return "#69C8F2"; // 파랑
  if (number <= 30) return "#FF7272"; // 빨강
  if (number <= 40) return "#AAAAAA"; // 회색
  return "#B0D840"; // 초록
};

const LottoBall: React.FC<LottoBallProps> = ({ number, size = "md" }) => {
  const color = getNumberColor(number);

  const dimensions = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-16 h-16 text-lg",
  }[size];

  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-white text-white font-bold shadow-md ${dimensions}`}
      style={{
        backgroundColor: color,
        backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.3)",
        aspectRatio: "1 / 1",
        minWidth: "2.5rem", // minimum to prevent squeezing
      }}
    >
      {number}
    </div>
  );
};

export default LottoBall;
