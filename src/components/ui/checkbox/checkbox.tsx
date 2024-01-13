import { forwardRef } from "react";

type CheckboxProps = {
  id: string;
  label: string;
  description: string;
  value?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, description, value, ...props }, ref) => {
    return (
      <div className="relative flex gap-x-3">
        <div className="flex items-center h-6">
          <input
            id={id}
            name={id}
            ref={ref}
            value={value}
            {...props}
            type="checkbox"
            className="w-4 h-4 border-none rounded shadow-sm accent-accent focus:ring-accent/60"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={id} className="font-medium text-text-color">
            {label}
          </label>
          <p className="text-xs text-text-color/60">{description}</p>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
