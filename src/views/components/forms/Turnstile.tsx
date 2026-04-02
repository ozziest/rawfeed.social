import { ThemeTypes } from "../../../types/shared";
import { FieldError } from "./FieldError";

const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY;

const ACCEPTABLE_TURNSTILE_THEMES = ["dark", "light"];

type Props = {
  theme: ThemeTypes;
  error?: string;
};

export default function Turnstile({ theme, error }: Props) {
  const selectedTheme = ACCEPTABLE_TURNSTILE_THEMES.includes(theme)
    ? theme
    : undefined;

  return (
    <div>
      <div
        class="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-size="flexible"
        data-theme={selectedTheme}
        data-callback="onTurnstileSuccess"
      ></div>
      <FieldError message={error} />
    </div>
  );
}
