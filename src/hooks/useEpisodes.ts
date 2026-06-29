import { useQuery } from "@tanstack/react-query";
import { getEpisodesByIds } from "../services/episode";

export function useEpisodes(episodeUrls: string[]) {
  // cada url é tipo ".../episode/1"; pegamos só o número do fim
  const ids = episodeUrls.map((url) => url.split("/").pop()).join(",");

  return useQuery({
    queryKey: ["episodes", ids],
    queryFn: () => getEpisodesByIds(ids),
    enabled: episodeUrls.length > 0,
  });
}
