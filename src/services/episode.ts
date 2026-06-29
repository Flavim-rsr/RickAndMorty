import { api } from "./api";
import type { Episode } from "../types/episode";

export async function getEpisodesByIds(ids: string): Promise<Episode[]> {
  const { data } = await api.get<Episode | Episode[]>(`/episode/${ids}`);
  // a API devolve um objeto único quando há só 1 id; normalizamos pra array
  return Array.isArray(data) ? data : [data];
}
