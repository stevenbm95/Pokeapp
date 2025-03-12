import { create } from "zustand";
import { pokemonApi, getPokemonInfo } from "../api/pokemonApi";

const usePokemonStore = create((set, get) => ({
  pokemons: [],
  favoritePokemons: [],
  isLoading: true,
  pokemonStore: {},
  setPokemons: (pokemons) => {
    set({ pokemons });
  },
  fetchPokemons: async () => {
    set({ isLoading: true });
    const data = await pokemonApi();
    set({ pokemons: data });
    
    setTimeout(() => {
      set({ isLoading: false });
      
    }, 1000);
  },
  setPokemon: (pokemon) => {
    set({ pokemonStore: pokemon });
  },
  fetchPokemon: async (pokemon) => {

    const {name, isFavorite} = pokemon;
    const data = await getPokemonInfo(pokemon.name);
    const { weight, height, types, sprites } = await data;
    const image = sprites?.other["official-artwork"].front_default || "";
    const elements = types?.map((tp) => tp.type.name).join(", ") ||
    "Tipos desconocidos"
    const newPokemon = {name,weight, height, elements, image, isFavorite };
    console.log(newPokemon)
    set({ pokemonStore: newPokemon });

    // sprites?.other["official-artwork"].front_default
  },
  toggleFavorite: (pokemon) => {
    const { pokemons, favoritePokemons,pokemonStore } = get();
    const updatedPokemons = pokemons.map((p) =>
      p.name === pokemon.name ? { ...p, isFavorite: !p.isFavorite } : p
    );

    const isFavorite = favoritePokemons.some(
      (fav) => fav.name !== pokemon.name
    );
    const updatedFavorites = isFavorite
      ? favoritePokemons.filter((fav) => fav.name !== pokemon.name)
      : [...favoritePokemons, pokemon];

 
    const updatedPokemonStore = pokemonStore.name === pokemon.name
        ? { ...pokemonStore, isFavorite: !pokemonStore.isFavorite }
        : pokemonStore;

    set({
      pokemons: updatedPokemons,
      favoritePokemons: updatedFavorites,
      pokemonStore: updatedPokemonStore,
    });
  },
}));

export default usePokemonStore;
