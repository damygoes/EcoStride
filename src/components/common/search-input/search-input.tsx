import { Button } from "@components/ui/button/button";
import { cn } from "@lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function SearchInput({ value, onChange, className }: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="Search" className="sr-only">
        Search
      </label>

      <input
        type="text"
        id="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for..."
        className="w-full rounded-md border-none py-2.5 pe-10 pl-2.5 text-text-color/50 shadow-sm sm:text-sm dark:text-text-color dark:bg-background"
      />

      <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
        <Button size="icon" className="cursor-default" variant="ghost">
          <span className="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </span>
    </div>
  );
}

export default SearchInput;
