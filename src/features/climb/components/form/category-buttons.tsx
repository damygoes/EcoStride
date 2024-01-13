import { RadioButton } from "@components/ui/radio-button/radio-button";
import { ClimbCategory } from "@type-definitions/Climb";

interface CategoryDetail {
  id: ClimbCategory;
  label: string;
  description: string;
}

const categories: CategoryDetail[] = [
  {
    id: "one",
    label: "Category One",
    description: "Get notified when someone posts a comment on a posting.",
  },
  {
    id: "two",
    label: "Category Two",
    description: "Get notified when a candidate applies for a job.",
  },
  {
    id: "three",
    label: "Category Three",
    description: "Get notified when a candidate accepts or rejects an offer.",
  },
  {
    id: "four",
    label: "Category Four",
    description: "Get notified when a candidate accepts or rejects an offer.",
  },
  {
    id: "Hors Catégorie (HC)",
    label: "Hors Catégorie (HC)",
    description: "Get notified when a candidate accepts or rejects an offer.",
  },
];

interface CategoryButtonsProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export default function CategoryButtons({
  value,
  onChange,
  name,
}: CategoryButtonsProps) {
  return (
    <div className="mt-6 space-y-6">
      {categories.map((category) => (
        <RadioButton
          key={category.id}
          id={`category-${category.id}`}
          name={name}
          label={category.label}
          description={category.description}
          value={category.id}
          checked={value === category.id}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
