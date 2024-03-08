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
  totalPages: number;
  pageSize: number;
  pageOffset: number;
  paginate: (page: number, size: number) => void;
}

const initialState: IPokemon = {
  pokemonList: [],
  pokemon: {},
  loading: false,
  error: null,
  totalPages: 0,
  handlePokemonClick: () => { },
  pageOffset: 1,
  pageSize: 8,
  paginate: ()=>{}
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
  const [totalPages, setTotalPages] = useState<number>(0)

  function handlePokemonClick(data: any) {
    console.log(data)
    setPokemon(data);
  }

  function paginate(page: number, size: number) {
    setPageOffset(page);
    setPageSize(size);
    console.log(pageOffset)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        ); // Adjust limit as needed
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon list");
        }
        const data = await response.json();

        // Fetch details for each Pokemon
        const detailsPromises = data.results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch Pokemon details");
          }
          return await detailsResponse.json();
        });

        const pokemonDetails = await Promise.all(detailsPromises);
        setFilteredList(pokemonDetails);
        setLoading(false)
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);
    
    
    useEffect(() => {
      if (filteredList?.length) {
        const startIndex = pageOffset > 1 ? pageSize * pageOffset : 0;
        const endIndex = startIndex + pageSize; // pageOffset>1?pageSize*2:pageSize
        const filtered = filteredList.slice(startIndex, endIndex);
        setPokemonList(filtered);
        setTotalPages(Math.ceil(filteredList.length / pageSize));
      }
    }, [filteredList, pageSize, pageOffset]);

  const providerValues = {
    loading,
    error,
    pokemon,
    pokemonList,
    handlePokemonClick,
    totalPages,
    pageSize,
    pageOffset,
    paginate
  };

  return (
    <PokemonContext.Provider value={providerValues}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);
