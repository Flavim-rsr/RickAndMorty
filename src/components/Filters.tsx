type FilterKey = "status" | "species" | "gender";

interface FiltersProps {
  status: string;
  species: string;
  gender: string;
  onChange: (key: FilterKey, value: string) => void;
}

const STATUS_OPTIONS = ["Alive", "Dead", "unknown"];
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

const selectClass =
  "rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800";

export default function Filters({
  status,
  species,
  gender,
  onChange,
}: FiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <select
        value={status}
        onChange={(e) => onChange("status", e.target.value)}
        className={selectClass}
      >
        <option value="">Status (todos)</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={species}
        onChange={(e) => onChange("species", e.target.value)}
        className={selectClass}
      >
        <option value="">Espécie (todas)</option>
        {SPECIES_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={gender}
        onChange={(e) => onChange("gender", e.target.value)}
        className={selectClass}
      >
        <option value="">Gênero (todos)</option>
        {GENDER_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
