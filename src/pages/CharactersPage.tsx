import { useMemo, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCard from "../components/CharacterCard";

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filters = useMemo(
    () => ({ name: debouncedSearch || undefined }),
    [debouncedSearch],
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(filters);

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Rick &amp; Morty</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar personagem..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
      />

      {isLoading && <p className="text-center">Carregando...</p>}

      {isError && (
        <p className="text-center text-red-500">
          Erro ao carregar personagens.
        </p>
      )}

      {!isLoading && !isError && characters.length === 0 && (
        <p className="text-center text-gray-500">
          Nenhum personagem encontrado.
        </p>
      )}

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {isFetchingNextPage ? "Carregando..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
