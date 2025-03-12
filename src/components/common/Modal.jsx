import usePokemonStore from "../../store/pokemonStore";
import StarIcon from "./StarIcon";
import Button from "./Button";
import Loader from "./Loader";
import { useEffect, useState } from "react";

const Modal = ({ pokemon, setIsOpen }) => {
  const { pokemonStore } = usePokemonStore();
  const [revealPokemon, setRevealPokemon] = useState(true);
  const { name, isFavorite, image, elements, weight, height } = pokemonStore;
  const [copied, setCopied] = useState(false);
  // const textToCopy = { name, elements, weight, height };

  // console.log(textToCopy);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealPokemon(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const animation = {
    y: 15,
    rotation: 380,
    duration: 2,
    repeat: -2,
    ease: "bounce.out",
  };

  const handleCopy = () => { 
    const textToCopy  = `Name: ${name}\nTypes: ${elements}\nWeight: ${weight}\nHeight: ${height}`

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    })
  }

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full  mx-auto "
    >
      <div className="m-auto relative w-full max-w-[570px] max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="relative flex items-center justify-center h-[220px] w-full bg-cover bg-center bg-no-repeat  rounded-t dark:border-gray-600 border-gray-200 bg-[url(../src/assets/landscape.jpg)]">
            {revealPokemon ? (
              <Loader animation={animation} />
            ) : (
              <img
                className="w-[180px] h-[180px] opacity-100 transition-opacity duration-1000 ease-in-out"
                src={image}
                alt="pokemon"
              />
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 text-blue-300 bg-red-100 rounded-[50%] text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-[#5E5E5E]">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-base leading-relaxed text-[#5E5E5E]">
              <strong>Weight: </strong>
              {weight}
            </p>
            <p className="text-base leading-relaxed text-[#5E5E5E]">
              <strong>Height: </strong>
              {height}
            </p>
            <p className="text-base leading-relaxed text-[#5E5E5E]">
              <strong>Types: </strong>
              {elements || "Tipos desconocidos"}
            </p>
          </div>
          <div className="flex justify-between  items-center p-4 md:p-5  dark:border-gray-600">
            <Button
              onClick={handleCopy}
              width="w-[195px]"
              height="h-[44px]"
              text="Share to my friends"
              color="bg-[#F22539]"
              hoverColor="hover:bg-[#e30c21]"
              />
              {copied && <p className="text-2xl leading-relaxed text-[#5E5E5E] text-center">Copiado</p>}
            <StarIcon pokemon={pokemon} size={50} isFavorite={isFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
