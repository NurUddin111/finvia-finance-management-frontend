import React from "react";

const AVATAR_COLORS: { bg: string; text: string }[] = [
  { bg: "bg-violet-500/20", text: "text-violet-300" },
  { bg: "bg-teal-500/20", text: "text-teal-300" },
  { bg: "bg-amber-500/20", text: "text-amber-300" },
  { bg: "bg-pink-500/20", text: "text-pink-300" },
  { bg: "bg-blue-500/20", text: "text-blue-300" },
  { bg: "bg-rose-500/20", text: "text-rose-300" },
  { bg: "bg-cyan-500/20", text: "text-cyan-300" },
];

type AvatarSize = "sm" | "md" | "lg";

interface ClientAvatarProps {
  name: string;
  size?: AvatarSize;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Deterministic color from name — same client always gets the same color
const getColorIndex = (name: string): number => {
  const code = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return code % AVATAR_COLORS.length;
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "w-7 h-7 text-[10px] rounded-lg",
  md: "w-9 h-9 text-[12px] rounded-[9px]",
  lg: "w-12 h-12 text-[14px] rounded-xl",
};

const ClientAvatar: React.FC<ClientAvatarProps> = ({ name, size = "md" }) => {
  const initials = getInitials(name);
  const { bg, text } = AVATAR_COLORS[getColorIndex(name)];

  return (
    <div
      className={`${SIZE_CLASSES[size]} ${bg} ${text} flex items-center justify-center font-semibold shrink-0 tracking-wide`}
    >
      {initials}
    </div>
  );
};

export default ClientAvatar;
