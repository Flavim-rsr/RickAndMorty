import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCharacters } from "../services/character";
import type { CharacterFilters } from "../types/character";

export function useCharacters(page: number, filters: CharacterFilters = {}) {
  return useQuery({
    // page e filters na queryKey: qualquer mudança busca os dados certos (com cache).
    queryKey: ["characters", page, filters],
    queryFn: () => getCharacters(page, filters),
    // mantém os dados da página anterior enquanto a nova carrega (evita "piscar" a tela).
    placeholderData: keepPreviousData,
  });
}
