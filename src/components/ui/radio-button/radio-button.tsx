import { ChangeEvent, forwardRef } from "react";

type RadioButtonProps = {
  id: string;
  name: string;
  label: string;
  description?: string;
  value: string;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChecked?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      id,
      name,
      label,
      description,
      value,
      checked,
      onChange,
      onChecked,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
      if (onChecked) onChecked(event);
    };

    return (
      <div className="relative flex gap-x-3">
        <div className="flex items-center h-6">
          <input
            id={id}
            name={name}
            ref={ref}
            value={value}
            checked={checked}
            onChange={handleChange}
            type="radio"
            {...props}
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={id} className="font-medium text-text-color">
            {label}
          </label>
          {description && (
            <p className="text-xs text-text-color/60">{description}</p>
          )}
        </div>
      </div>
    );
  },
);

RadioButton.displayName = "RadioButton";

export { RadioButton };
