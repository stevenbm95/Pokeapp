import { create } from "zustand";
import pokemonApi from "../api/pokemonApi";

const usePokemonStore = create((set) => ({
  pokemons: [],
  fetchPokemons: async () => {
    const data = await pokemonApi();
    set({ pokemons: data });
  },
}));

export default usePokemonStore;
