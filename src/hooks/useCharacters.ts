import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "../services/character";
import type { CharacterFilters } from "../types/character";

export function useCharacters(filters: CharacterFilters = {}) {
  return useInfiniteQuery({
    // a queryKey inclui os filtros: ao mudar busca/filtro, o React Query
    // reseta a lista e busca do zero (cache por combinação de filtros).
    queryKey: ["characters", filters],
    queryFn: ({ pageParam }) => getCharacters(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // info.next vem como URL completa; extraímos o número da próxima página.
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const next = url.searchParams.get("page");
      return next ? Number(next) : undefined;
    },
  });
}
