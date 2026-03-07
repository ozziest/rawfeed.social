type FieldErrorProps = { message?: string };

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return "";
  return (
    <div class="text-red-700 text-sm my-1" safe>
      {message}
    </div>
  );
}
