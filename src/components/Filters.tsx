import { Search, ChevronDown } from "lucide-react";

type FilterKey = "status" | "species" | "gender";

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  species: string;
  gender: string;
  onChange: (key: FilterKey, value: string) => void;
}

const SPECIES_OPTIONS = [
  "Human",
  "Alien",
  "Humanoid",
  "Robot",
  "Animal",
  "Mythological Creature",
  "Poopybutthole",
  "Cronenberg",
  "Disease",
  "unknown",
];
const GENDER_OPTIONS = ["Female", "Male", "Genderless", "unknown"];
const STATUS_OPTIONS = ["Alive", "Dead", "unknown"];

const selectClass =
  "h-14 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200";

interface SelectFieldProps {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({
  placeholder,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

export default function Filters({
  search,
  onSearchChange,
  status,
  species,
  gender,
  onChange,
}: FiltersProps) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      <div className="relative w-full">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by name..."
          className="h-14 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      <SelectField
        placeholder="Species"
        value={species}
        options={SPECIES_OPTIONS}
        onChange={(value) => onChange("species", value)}
      />
      <SelectField
        placeholder="Gender"
        value={gender}
        options={GENDER_OPTIONS}
        onChange={(value) => onChange("gender", value)}
      />
      <SelectField
        placeholder="Status"
        value={status}
        options={STATUS_OPTIONS}
        onChange={(value) => onChange("status", value)}
      />
    </div>
  );
}
