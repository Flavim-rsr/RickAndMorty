import type { Character, Status } from "../types/character";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const statusColor: Record<Status, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function CharacterCard({
  character,
  onClick,
}: CharacterCardProps) {
  return (
    <button
      onClick={onClick}
      className="group block w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
        className="aspect-square w-full bg-gray-100 object-cover transition group-hover:scale-105 dark:bg-gray-700"
      />
      <div className="p-3">
        <h2 className="truncate font-bold text-gray-900 dark:text-gray-100">
          {character.name}
        </h2>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span
            className={`h-2 w-2 rounded-full ${statusColor[character.status]}`}
          />
          <span>
            {character.status} — {character.species}
          </span>
        </div>
      </div>
    </button>
  );
}
