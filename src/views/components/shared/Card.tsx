import type { Children } from "@kitajs/html";

type CardProps = {
  class?: string;
  children: Children;
};

export function Card({ class: extraClass = "", children }: CardProps) {
  return (
    <div class={("bg-white rounded-lg shadow-sm p-6 " + extraClass).trim()}>
      {children}
    </div>
  );
}
