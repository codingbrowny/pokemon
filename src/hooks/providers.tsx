"use client";
import React from "react";
import { PokemonProvider } from "./pokemon-context";
import { ThemeProvider } from "./theme-context";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <PokemonProvider>{children}</PokemonProvider>
    </ThemeProvider>
  );
};

export default Providers;
