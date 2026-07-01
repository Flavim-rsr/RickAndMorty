import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterCard from "./CharacterCard";
import type { Character } from "../types/character";

// personagem fake só pra renderizar o card no teste
const character: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "https://example.com/rick.png",
  episode: [],
  url: "",
  created: "",
};

describe("CharacterCard", () => {
  it("mostra o nome e o status do personagem", () => {
    render(
      <CharacterCard
        character={character}
        onClick={() => {}}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />,
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
  });

  it("chama onToggleFavorite ao clicar no coração", async () => {
    const onToggleFavorite = vi.fn();

    render(
      <CharacterCard
        character={character}
        onClick={() => {}}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    await userEvent.click(screen.getByLabelText("Add to favorites"));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
