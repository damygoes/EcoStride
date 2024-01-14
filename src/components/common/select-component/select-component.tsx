import { Listbox, Transition } from "@headlessui/react";
import { cn } from "@lib/utils";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { Fragment, ReactNode } from "react";

interface SelectComponentProps<T extends { toString(): string }> {
  // Ensure T has toString()
  items: T[];
  selected: T;
  onChange: (value: T) => void;
  labelFunction?: (item: T) => ReactNode; // Return a ReactNode to avoid JSX errors
  placeholder?: ReactNode;
  className?: string;
  isErrored?: boolean;
  disabled?: boolean;
}

export default function SelectComponent<T extends { toString(): string }>({
  items,
  selected,
  onChange,
  labelFunction = (item) => item.toString(), // Default function just converts item to string
  placeholder,
  className,
  isErrored = false,
  disabled = false,
}: SelectComponentProps<T>) {
  return (
    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      <div className={cn("relative mt-1", className)}>
        <Listbox.Button
          className={cn(
            "relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-sm cursor-default bg-background focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-accent md:text-sm",
            {
              "ring-1 ring-accent": isErrored,
              "opacity-50 cursor-not-allowed": disabled,
            },
          )}
        >
          <span
            className={cn("block truncate text-text-color", {
              "text-accent": disabled,
            })}
          >
            {selected
              ? labelFunction(selected)
              : placeholder || "Please choose an option"}
            {/* Show the selected item or the placeholder */}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <IconSelector
              className="w-4 h-4 text-text-color/50"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-background max-h-60 ring-1 ring-text-color/5 focus:outline-none sm:text-sm">
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-secondary text-white" : "text-text-color"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {labelFunction(item)}
                      {/* No error here as labelFunction
                      returns a ReactNode */}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                        <IconCheck className="w-4 h-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
