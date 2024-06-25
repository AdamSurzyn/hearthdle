import React from "react";
import { render, screen } from "@testing-library/react";
import Game from "./game";

// Czy to powinno byc rozszerzenie .tsx? Z ts mi nie dziala.

describe("Game", () => {
  it("Gets a random card, and shows grid and search bar", () => {
    render(<Game />);

    const search = screen.getByRole("textbox");
    const grid = screen.getByRole("grid");
  });
});

//! Test mi zwraca :'No QueryClient set, use QueryClientProvider to set one' przy linijce 14 komponentu 'Game'.
//TODO 1) sprawdzic, czy renderuja sie search i grid
//TODO 2) sprawdzic, czy randomCard zwraca pojedyncza karte
//TODO 3) sprobowac wywolac error przy braniu danych przez api i sprawdzic, czy dobrze zareaguje
