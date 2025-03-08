import { create } from "zustand";
import {pokemonApi, getPokemonInfo} from "../api/pokemonApi";

const usePokemonStore = create((set) => ({
  pokemons: [],
  favoritePokemons: [],
  setPokemons: (pokemons) => {
    set({ pokemons });
  },
  fetchPokemons: async () => {
    const data = await pokemonApi();
    set({ pokemons: data });
  },
  pokemonStore:{},
  setPokemon: (pokemon) => {
    set({ pokemonStore: pokemon  }); 
  },
  fetchPokemon: async (name) => {
    const data = await getPokemonInfo(name);
    set({ pokemonStore: data });
  }
}));

export default usePokemonStore;
