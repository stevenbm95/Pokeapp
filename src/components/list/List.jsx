import React, { useEffect, useState } from "react";
import usePokemonStore from "../../store/pokemonStore";
import StarIcon from "../../assets/icons/StarIcon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { getPokemonInfo } from "../../api/pokemonApi";

const List = () => {
  const { pokemons, fetchPokemons, setPokemons, setPokemon, fetchPokemon } =
    usePokemonStore();

  const [listPokemons, setListPokemons] = useState(pokemons);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listPokemons.length === 0 && !showFavorites) {
      setListPokemons(pokemons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons, showFavorites]);

  const handleChange = (pokemon) => {
    setSearch(pokemon);
    const filtredPokemons = pokemons.filter((pok) =>
      pok.name.includes(pokemon)
    );
    setListPokemons(filtredPokemons);
  };

  const addFavorite = (pokemon) => {
    const updatedPokemons = pokemons.map((p) =>
      p.name === pokemon.name ? { ...p, isFavorite: !p.isFavorite } : p
    );
    setPokemons(updatedPokemons);

    let updatedList = updatedPokemons;

    if (search !== "") {
      updatedList = updatedList.filter((pok) => pok.name.includes(search));
    } else if (showFavorites) {
      updatedList = updatedList.filter((pok) => pok.isFavorite);
    }
    setListPokemons(updatedList);
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

    if (isOpen) {
      setPokemon("");
    }
    setPokemon(pokemon);
    fetchPokemon(pokemon.name);
  };

  return (
    <div className="bg-[#efefef]">
      <div className="max-w-[570px] mx-auto">
        <form className="py-10">
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
                aria-hidden="true"
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
        <div>{isOpen && <Modal setIsOpen={setIsOpen} />}</div>
        <ul className="flex flex-col m-auto mb-10 ">
          {listPokemons.map((pokemon, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-1 mb-3 text-2xl bg-[#FFFF] border-round border-gray-300 shadow-md px-4"
            >
              <button
                onClick={() => showPokemon(pokemon)}
                className="cursor-pointer"
                type="button"
              >
                {pokemon.name}
              </button>
              <StarIcon
                onClick={() => addFavorite(pokemon)}
                size={40}
                color={pokemon.isFavorite ? "#ECA539" : "#BFBFBF"}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center p-2 m-auto border-top-solid border-1 border-gray-300 shadow-md py-5 gap-3">
        <Button
          onClick={allPokemons}
          text="All"
          color="bg-[#F22539]"
          hoverColor="hover:bg-[#e30c21]"
        />

        <Button
          onClick={favoritesPokemons}
          text="Favorites"
          color="bg-[#BFBFBF]"
          hoverColor="hover:bg-[#b2b2b296]"
        />
      </div>
    </div>
  );
};

export default List;
