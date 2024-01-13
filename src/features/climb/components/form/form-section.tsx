import { cn } from "@lib/utils";

type FormSectionProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function FormSection({
  title,
  children,
  className,
}: FormSectionProps) {
  return (
    <div
      className={cn(
        "w-full pt-4 pb-8 px-3 border-b border-text-color/10",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold leading-7 text-text-color">
        {title}
      </h2>
      {children}
    </div>
  );
}
