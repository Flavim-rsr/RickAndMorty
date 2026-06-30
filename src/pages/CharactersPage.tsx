import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useFavorites } from "../hooks/useFavorites";
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
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const { isFavorite, toggleFavorite } = useFavorites();

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

  // quando o filtro de favoritos está ativo, mostra só os já carregados que são favoritos
  const visibleCharacters = showFavoritesOnly
    ? characters.filter((character) => isFavorite(character.id))
    : characters;

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

      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
            showFavoritesOnly
              ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-500/10"
              : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <Heart
            size={16}
            className={showFavoritesOnly ? "fill-red-500 text-red-500" : ""}
          />
          {showFavoritesOnly ? "Showing favorites" : "Favorites only"}
        </button>
      </div>

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

      {!isLoading && showFavoritesOnly && visibleCharacters.length === 0 && (
        <p className="text-center text-gray-500">
          No favorites yet.
        </p>
      )}

      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {visibleCharacters.map((character) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => setSelected(character)}
              isFavorite={isFavorite(character.id)}
              onToggleFavorite={() => toggleFavorite(character.id)}
            />
          </li>
        ))}
      </ul>

      {hasNextPage && !showFavoritesOnly && (
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
