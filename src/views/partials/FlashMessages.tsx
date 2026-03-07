type FlashState = {
  error?: string;
  success?: string;
  [key: string]: unknown;
};

type FlashMessagesProps = {
  state: FlashState | Record<string, unknown>;
};

import { Alert } from "../components/shared/Alert";

export function FlashMessages({ state }: FlashMessagesProps) {
  const s = state as FlashState;
  return (
    <>
      {s.error ? (
        <Alert type="error">
          <span safe>{s.error as string}</span>
        </Alert>
      ) : null}
      {s.success ? (
        <Alert type="success">
          <span safe>{s.success as string}</span>
        </Alert>
      ) : null}
    </>
  );
}
