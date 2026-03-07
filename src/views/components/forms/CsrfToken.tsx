type CsrfTokenProps = {
  token: string;
};

export function CsrfToken({ token }: CsrfTokenProps) {
  return <input type="hidden" name="_csrf" value={token} />;
}
