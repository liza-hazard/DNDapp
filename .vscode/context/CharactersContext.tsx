import { createContext, useState } from "react";
import requests from "../../constants/charactersData";

export const CharactersContext = createContext();

const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState(requests);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
};

export default CharactersProvider;
