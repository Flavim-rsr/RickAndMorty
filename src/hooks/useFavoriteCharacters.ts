import { useQuery } from "@tanstack/react-query";
import { getCharactersByIds } from "../services/character";

export function useFavoriteCharacters(ids: number[]) {
  return useQuery({
    queryKey: ["favorite-characters", ids],
    queryFn: () => getCharactersByIds(ids),
    // só busca quando há favoritos (evita requisição desnecessária)
    enabled: ids.length > 0,
  });
}
