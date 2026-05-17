export type AvatarProps = {
  initials: string;
  bgClass: string;
  /** Provide when the avatar is the sole accessible content of an interactive
   * element (e.g. a link with no visible text). Sets role="img" + aria-label
   * and removes aria-hidden. Omit for decorative avatars that sit alongside
   * visible text — aria-hidden="true" is applied automatically. */
  label?: string;
  size?: number;
  className?: string;
};

export function Avatar({
  initials,
  bgClass,
  label,
  size = 40,
  className = "",
}: AvatarProps) {
  const fontSize = Math.round(size * 0.38);
  return (
    <div
      class={`rounded-full flex items-center justify-center font-bold text-white select-none shrink-0 ${bgClass} ${className}`}
      style={`width:${size}px;height:${size}px;font-size:${fontSize}px;line-height:1`}
      role={label ? "img" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : "true"}
      safe
    >
      {initials}
    </div>
  );
}
