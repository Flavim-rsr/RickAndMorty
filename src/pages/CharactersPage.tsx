import { useMemo, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import Filters from "../components/Filters";
import logo from "../assets/logo.svg";
import type { Character } from "../types/character";

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
  });
  const [selected, setSelected] = useState<Character | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  const handleFilterChange = (
    key: "status" | "species" | "gender",
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const queryFilters = useMemo(
    () => ({
      name: debouncedSearch || undefined,
      status: filters.status || undefined,
      species: filters.species || undefined,
      gender: filters.gender || undefined,
    }),
    [debouncedSearch, filters],
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(queryFilters);

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  // dispara o carregamento automático quando a sentinela entra na tela
  const loadMoreRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <img
        src={logo}
        alt="Rick and Morty"
        className="mx-auto mb-8 w-full max-w-sm"
      />

      <Filters
        search={search}
        onSearchChange={setSearch}
        status={filters.status}
        species={filters.species}
        gender={filters.gender}
        onChange={handleFilterChange}
      />

      {isLoading && <p className="text-center">Loading...</p>}

      {isError && (
        <p className="text-center text-red-500">
          Error loading characters.
        </p>
      )}

      {!isLoading && !isError && characters.length === 0 && (
        <p className="text-center text-gray-500">
          No characters found.
        </p>
      )}

      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => setSelected(character)}
            />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {selected && (
        <CharacterModal
          character={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
