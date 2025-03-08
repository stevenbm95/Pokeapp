import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon";



export const pokemonApi = async () => {
  const response = await axios.get(url);
  const results = await response.data.results;
  const pokemons = results.map( (pokemon) => ({ ...pokemon, isFavorite: false}))
  return pokemons;
}


export const getPokemonInfo = async (name) => {  
  const response = await axios.get(url + `/${name}`);
  // console.log(response.data);
  return response.data;
}





// export default { pokemonApi, getPokemonInfo };