import { Link, useParams } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacter";
import type { Status } from "../types/character";

const statusColor: Record<Status, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function CharacterDetailsPage() {
  const { id } = useParams();
  const { data: character, isLoading, isError } = useCharacter(id);

  if (isLoading) {
    return <p className="p-8 text-center">Carregando...</p>;
  }

  if (isError || !character) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Personagem não encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const info = [
    { label: "Espécie", value: character.species },
    { label: "Gênero", value: character.gender },
    { label: "Origem", value: character.origin.name },
    { label: "Localização atual", value: character.location.name },
    { label: "Episódios", value: character.episode.length },
  ];

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        to="/"
        aria-label="Voltar"
        className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover sm:w-72"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {character.name}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span
              className={`h-3 w-3 rounded-full ${statusColor[character.status]}`}
            />
            <span>{character.status}</span>
          </div>

          <dl className="mt-6 space-y-3">
            {info.map((item) => (
              <div key={item.label} className="flex justify-between gap-4">
                <dt className="font-medium text-gray-500 dark:text-gray-400">
                  {item.label}
                </dt>
                <dd className="text-right text-gray-900 dark:text-gray-100">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
