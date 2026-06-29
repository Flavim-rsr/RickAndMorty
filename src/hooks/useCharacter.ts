import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "../services/character";

export function useCharacter(id: string | undefined) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id!),
    // só dispara a busca quando o id existe (evita chamar a API sem id na URL)
    enabled: !!id,
  });
}
