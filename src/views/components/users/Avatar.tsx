export type AvatarProps = {
  initials: string;
  bgClass: string;
  size?: number;
  className?: string;
};

export function Avatar({
  initials,
  bgClass,
  size = 40,
  className = "",
}: AvatarProps) {
  const fontSize = Math.round(size * 0.38);
  return (
    <div
      class={`rounded-full flex items-center justify-center font-bold text-white select-none shrink-0 ${bgClass} ${className}`}
      style={`width:${size}px;height:${size}px;font-size:${fontSize}px;line-height:1`}
      aria-hidden="true"
      safe
    >
      {initials}
    </div>
  );
}
