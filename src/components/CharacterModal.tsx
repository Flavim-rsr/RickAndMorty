import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { Character, Status } from "../types/character";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const statusColor: Record<Status, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function CharacterModal({
  character,
  onClose,
}: CharacterModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    // trava o scroll da página enquanto o modal está aberto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    // clicar no fundo (backdrop) fecha o modal
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* stopPropagation impede que o clique dentro do modal feche-o */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
      >
        <img
          src={character.image}
          alt={character.name}
          className="aspect-square w-full object-cover"
        />

        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {character.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span
              className={`h-3 w-3 rounded-full ${statusColor[character.status]}`}
            />
            <span>{character.status}</span>
          </div>

          <div className="mt-5 flex gap-3">
            <Link
              to={`/character/${character.id}`}
              className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-600"
            >
              View more
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
