import { Heart } from "lucide-react";
import type { Character, Status } from "../types/character";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const statusColor: Record<Status, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function CharacterCard({
  character,
  onClick,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) {
  // impede que o clique no coração abra a modal do card
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <span
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur transition hover:bg-white dark:bg-gray-900/70 dark:text-gray-200"
      >
        <Heart
          size={18}
          className={isFavorite ? "fill-red-500 text-red-500" : ""}
        />
      </span>
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
