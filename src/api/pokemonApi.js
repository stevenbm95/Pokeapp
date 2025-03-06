import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon";



const pokemonApi = async () => {
  const response = await axios.get(url);
  const pokemons = await response.data.results;
  return pokemons;
}




export default pokemonApi;