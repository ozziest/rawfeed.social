import { Children } from "@kitajs/html";
import { nanoid } from "nanoid";
import { CheckIcon } from "../icons/CheckIcon";
import { FieldError } from "./FieldError";

type Props = {
  name: string;
  value?: string;
  children?: Children;
  error?: string;
};

const id = nanoid();

export function Checkbox({ name, value, error, children }: Props) {
  return (
    <div>
      <div class="flex gap-x-2 items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          class="appearance-none peer w-6 h-6 border rounded-sm bg-white mt-1 shrink-0 checked:bg-black checked:border-0 cursor-pointer"
        />
        <label for={id} class="cursor-pointer">
          {children}
        </label>
        <CheckIcon class="absolute w-4 h-4 mt-2 ml-1 hidden peer-checked:block text-white" />
      </div>
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}
