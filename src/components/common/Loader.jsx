import { useEffect, useRef } from "react";
import gsap from "gsap";
const Loader = ({ animation }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!animation) {
      gsap.to(boxRef.current, {
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%", // Cuando el elemento está al 80% de la ventana
          end: "top 30%",
          scrub: true,
        },
      });
    } else {
      gsap.to(boxRef.current, { ...animation });
    }
  }, [animation]);

  return (
    <div ref={boxRef} className="flex flex-col justify-center  items-center">
      <img
        src="/Loadersvg.svg"
        alt="Loading..."
        className={`w-32 h-32`}
      />
      {/* <p className="mt-4 text-lg font-semibold text-gray-700">Cargando...</p> */}
    </div>
  );
};

export default Loader;

// h-[100vh] w-[100vw]
