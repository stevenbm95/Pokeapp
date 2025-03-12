import React, { useEffect, useMemo, useState } from "react";
import usePokemonStore from "../../store/pokemonStore";
import StarIcon from "../common/StarIcon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import NotFound from "../common/NotFound";
import Loader from "../common/Loader";

const List = () => {
  const { pokemons, fetchPokemons, setPokemon, fetchPokemon, pokemonStore, isLoading } = usePokemonStore(); 

  const [listPokemons, setListPokemons] = useState(pokemons);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtredPokemons = useMemo(() => {
    if (showFavorites) {
      return pokemons.filter((pok) => pok.isFavorite);
    }
    if (search !== "") {
      return pokemons.filter((pok) => pok.name.includes(search));
    }
    return pokemons;
  }, [pokemons, showFavorites, search]);

  useEffect(() => {
    setListPokemons(filtredPokemons);
  }, [filtredPokemons]);

  const handleChange = (value) => {
    setSearch(value);
    const filtredPokemons = pokemons.filter((pok) => pok.name.includes(value));
    setListPokemons(filtredPokemons);
  };

  const allPokemons = () => {
    setShowFavorites(false);
    setListPokemons(pokemons);
    setSearch("");
  };

  const favoritesPokemons = () => {
    setSearch("");
    setShowFavorites(true);
    const fvPokemon = pokemons.filter((pok) => pok.isFavorite);
    setListPokemons(fvPokemon);
  };

  const showPokemon = (pokemon) => {
    setIsOpen(!isOpen);
    if (isOpen) setPokemon(null);
     else 
      fetchPokemon(pokemon);
      setPokemon(pokemon);  
  };

  const animation = {
    y: 50,
    // opacity: 0,
    duration: 1.5,
    ease: "bounce",
  };

  return (
    <div className="bg-[#efefef] min-h-screen flex flex-col ">
      {/* <Loader animation={animation} /> */}
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center space-y-10">
          <Loader animation={animation} />
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Cargando...
          </p>
        </div>
      ) : (
        <div>
          <form className="py-10 w-[570px] mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search Mockups, Logos..."
                required
                value={search}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </form>
          {listPokemons.length > 0 && (
            <div>
              <ul className="flex flex-col m-auto mb-10 max-w-[570px] mx-auto">
                <div>
                  {isOpen && (
                    <Modal pokemon={pokemonStore} setIsOpen={setIsOpen} />
                  )}
                </div>
                {listPokemons.map((pokemon, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white p-1 mb-3 text-2xl  border-round border-gray-300 shadow-md px-4"
                  >
                    <button
                      onClick={() => showPokemon(pokemon)}
                      className="cursor-pointer"
                      type="button"
                    >
                      {pokemon.name}
                    </button>
                    <StarIcon
                      pokemon={pokemon}
                      size={40}
                      isFavorite={pokemon.isFavorite}
                    />
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center p-2 mt-auto border-top-solid border-1 border-gray-300 shadow-md py-5 gap-3">
                <Button
                  onClick={allPokemons}
                  text="All"
                  height="h-[44px]"
                  width="w-[275px]"
                  color="bg-[#F22539]"
                  hoverColor="hover:bg-[#e30c21]"
                />
                <Button
                  onClick={favoritesPokemons}
                  height="h-[44px]"
                  width="w-[275px]"
                  text="Favorites"
                  color="bg-[#BFBFBF]"
                  hoverColor="hover:bg-[#b2b2b296]"
                />
              </div>
            </div>
          )}

          {listPokemons.length === 0 && <NotFound></NotFound>}
        </div>
      )}
    </div>
  );
};

export default List;
