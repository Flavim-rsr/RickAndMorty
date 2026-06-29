import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useCharacter } from "../hooks/useCharacter";
import { useEpisodes } from "../hooks/useEpisodes";
import type { Status } from "../types/character";

const statusColor: Record<Status, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default function CharacterDetailsPage() {
  const { id } = useParams();
  const { data: character, isLoading, isError } = useCharacter(id);
  const { data: episodes, isLoading: isLoadingEpisodes } = useEpisodes(
    character?.episode ?? [],
  );

  if (isLoading) {
    return <p className="p-8 text-center">Loading...</p>;
  }

  if (isError || !character) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Character not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 underline">
          Back to list
        </Link>
      </div>
    );
  }

  const info = [
    { label: "Gender", value: character.gender },
    { label: "Status", value: character.status },
    { label: "Specie", value: character.species },
    { label: "Origin", value: character.origin.name },
    { label: "Type", value: character.type || "Unknown" },
    { label: "Location", value: character.location.name },
    { label: "Total episodes", value: character.episode.length },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <ArrowLeft size={18} />
        GO BACK
      </Link>

      <div className="mt-6 flex flex-col items-center">
        <img
          src={character.image}
          alt={character.name}
          className="h-44 w-44 rounded-full object-cover shadow-md"
        />
        <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {character.name}
        </h1>
        <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span
            className={`h-3 w-3 rounded-full ${statusColor[character.status]}`}
          />
          <span>{character.status}</span>
        </div>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Informations
          </h2>
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            {info.map((item) => (
              <div key={item.label} className="py-3">
                <dt className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {item.label}
                </dt>
                <dd className="text-sm text-gray-500 dark:text-gray-400">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Episodes
          </h2>

          {isLoadingEpisodes && (
            <p className="text-sm text-gray-500">Loading episodes...</p>
          )}

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {episodes?.map((episode) => (
              <li
                key={episode.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {episode.episode}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {episode.name}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {episode.air_date}
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
