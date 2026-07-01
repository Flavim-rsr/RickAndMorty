import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

describe("useFavorites", () => {
  it("começa sem favoritos", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("adiciona um favorito ao chamar toggleFavorite", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.favorites).toEqual([1]);
  });

  it("remove o favorito ao chamar toggleFavorite de novo", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(1);
    });
    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(false);
    expect(result.current.favorites).toEqual([]);
  });
});
