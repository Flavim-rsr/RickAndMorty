// adiciona os matchers extras do jest-dom (ex: toBeInTheDocument)
import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

// localStorage fake (em memória) pros testes — previsível e isolado
const store = new Map<string, string>();

const localStorageMock = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
  removeItem: (key: string) => void store.delete(key),
  clear: () => store.clear(),
};

vi.stubGlobal("localStorage", localStorageMock);

// garante que cada teste começa com o storage limpo
beforeEach(() => {
  store.clear();
});
