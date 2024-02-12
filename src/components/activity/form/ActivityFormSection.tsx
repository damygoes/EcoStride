import { cn } from "@lib/utils";

type ActivityFormSectionProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function ActivityFormSection({
  title,
  children,
  className,
}: ActivityFormSectionProps) {
  return (
    <div className={cn("w-full px-3 border-b border-text-color/10", className)}>
      <h2 className="text-2xl font-semibold leading-7 text-text-color">
        {title}
      </h2>
      {children}
    </div>
  );
}
