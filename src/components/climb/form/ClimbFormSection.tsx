import { cn } from "@lib/utils";

type ClimbFormSectionProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function ClimbFormSection({
  title,
  children,
  className,
}: ClimbFormSectionProps) {
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
