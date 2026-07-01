import { useEffect, useMemo, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";
import { useFavorites } from "../hooks/useFavorites";
import { useFavoriteCharacters } from "../hooks/useFavoriteCharacters";
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
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Character | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

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

  // ao mudar busca ou filtros, volta pra primeira página
  useEffect(() => {
    setPage(1);
  }, [queryFilters]);

  // ao trocar de página, rola a tela de volta pro topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const { data, isLoading, isError, isFetching } = useCharacters(
    page,
    queryFilters,
  );

  // busca todos os favoritos por id (só quando o filtro "Favorites only" está ativo)
  const favoritesQuery = useFavoriteCharacters(
    showFavoritesOnly ? favorites : [],
  );

  const characters = showFavoritesOnly
    ? favoritesQuery.data ?? []
    : data?.results ?? [];

  const loading = showFavoritesOnly ? favoritesQuery.isLoading : isLoading;
  const error = showFavoritesOnly ? favoritesQuery.isError : isError;
  const totalPages = data?.info.pages ?? 0;

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

      {loading && <p className="text-center">Loading...</p>}

      {error && (
        <p className="text-center text-red-500">
          Error loading characters.
        </p>
      )}

      {!loading && !error && characters.length === 0 && (
        <p className="text-center text-gray-500">
          {showFavoritesOnly ? "No favorites yet." : "No characters found."}
        </p>
      )}

      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {characters.map((character) => (
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

      {!showFavoritesOnly && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1 || isFetching}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages || isFetching}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Next
            <ChevronRight size={16} />
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
