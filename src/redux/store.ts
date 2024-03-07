import { configureStore } from "@reduxjs/toolkit";
import pokemonReducuer from "./features/pokemon-slice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducuer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
