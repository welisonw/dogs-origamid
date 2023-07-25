
import { useEffect, useState } from "react";

export const useMedia = (media) => {
  const [ match, setMatch ] = useState(null);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);

      setMatch(matches);
    };

    // Para já carregar o menuMobile sem ter que dar resize
    changeMatch();

    window.addEventListener('resize', changeMatch);

    // Toda vez que é adicionado evento no window, tem que limpar esse evento no return
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};
