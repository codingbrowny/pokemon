import { createSlice } from "@reduxjs/toolkit";

// interface

const initialState: any = {}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon: (state, { payload }) => {
      state = payload;
    },

    pokemonsFetched: (state, { payload }) => {
      state = payload
    }
  },
});

export const { setPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
