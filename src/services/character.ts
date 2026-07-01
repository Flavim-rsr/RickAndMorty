import axios from "axios";
import { api } from "./api";
import type {
  Character,
  CharacterResponse,
  CharacterFilters,
} from "../types/character";

const EMPTY_RESPONSE: CharacterResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export async function getCharacters(
  page: number,
  filters: CharacterFilters = {},
): Promise<CharacterResponse> {
  try {
    const { data } = await api.get<CharacterResponse>("/character", {
      params: { page, ...filters },
    });
    return data;
  } catch (error) {
    // a API responde 404 quando nenhum personagem bate com os filtros
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return EMPTY_RESPONSE;
    }
    throw error; // qualquer outro erro (rede, 500...) é erro de verdade
  }
}

export async function getCharacterById(
  id: string | number,
): Promise<Character> {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
}

export async function getCharactersByIds(
  ids: number[],
): Promise<Character[]> {
  if (ids.length === 0) return [];
  const { data } = await api.get<Character | Character[]>(`/character/${ids}`);
  // a API devolve um objeto único quando há só 1 id; normalizamos pra array
  return Array.isArray(data) ? data : [data];
}
