"use client";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IPokemon {
  pokemonList: any[];
  pokemon: any;
  loading: boolean;
  error: any;
  handlePokemonClick: (data?: any) => void;
}

const initialState: IPokemon = {
  pokemonList: [],
  pokemon: {},
  loading: false,
  error: null,
  handlePokemonClick: () => {},
};

const PokemonContext = createContext<IPokemon>(initialState);

export const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const [pokemon, setPokemon] = useState<any>(undefined);
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>();
  const [pageSize, setPageSize] = useState<number>(8);
  const [pageOffset, setPageOffset] = useState<number>(1);

  function handlePokemonClick(data: any) {
    setPokemon(data);
  }

  function paginate(page: number, size: number) {
    setPageOffset(page);
    setPageSize(size);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch details for each Pokemon
        const detailsPromises = Array.from({length:50},).map(async (pokemon: any, i) => {
          const detailsResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${i+1}/`
          );
          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch Pokemon details");
          }
          return await detailsResponse.json();
        });

        const pokemonDetails = await Promise.all(detailsPromises);
        setFilteredList(pokemonDetails);
        setPokemonList(pokemonDetails)
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);
    
    
    useEffect(() => {
      if (filteredList?.length) {
        const filtered = filteredList?.map((item, i) => {
          if (i <= pageSize) {
            return item;
          }
        });
        setPokemonList(filtered);
      }
    }, [filteredList, pageSize, pageOffset]);

  const providerValues = {
    loading,
    error,
    pokemon,
    pokemonList,
    handlePokemonClick,
  };

  return (
    <PokemonContext.Provider value={providerValues}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);
