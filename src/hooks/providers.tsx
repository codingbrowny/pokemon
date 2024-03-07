"use client";
import React from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { PokemonProvider } from "./pokemon-context";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <PokemonProvider>
      <Provider store={store}>{children}</Provider>
    </PokemonProvider>
  );
};

export default Providers;
