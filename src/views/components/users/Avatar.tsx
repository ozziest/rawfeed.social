
export type AvatarProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Avatar({
  src,
  alt = "Avatar",
  size = 40,
  className = "",
}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      class={`rounded-full object-cover border border-gray-200 ` + className}
      loading="lazy"
    />
  );
}
