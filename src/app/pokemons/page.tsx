"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AboutPokemon, Paginator, Pokemon, Searchbar, Theme } from "@/components";
import { usePokemon } from "@/hooks/pokemon-context";


const PokemonsPage = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [showThemeOverlay, setShowThemeOverlay] = useState<boolean>(false)
  const {loading, pokemonList} = usePokemon()

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      try {
  //        const response = await fetch(
  //          "https://pokeapi.co/api/v2/pokemon?limit=20"
  //        ); // Adjust limit as needed
  //        if (!response.ok) {
  //          throw new Error("Failed to fetch Pokemon list");
  //        }
  //        const data = await response.json();

  //        // Fetch details for each Pokemon
  //        const detailsPromises = data.results.map(async (pokemon:any) => {
  //          const detailsResponse = await fetch(pokemon.url);
  //          if (!detailsResponse.ok) {
  //            throw new Error("Failed to fetch Pokemon details");
  //          }
  //          return await detailsResponse.json();
           
  //        });

  //        const pokemonDetails = await Promise.all(detailsPromises);
  //        setPokemons(pokemonDetails);
  //      } catch (error) {
  //        setError(error);
  //      }
  //    };

  //    fetchData();
  //  }, []);

  return (
    <>
      <section className="flex flex-col gap-10 h-full relative">
        <nav className="flex items-center lg:justify-between gap-5 max-md:px-3 md:px-7 lg:px-16 h-[72px] shadow-md">
          <header className="flex items-center gap-3">
            <Image
              src={"/images/logo.svg"}
              alt="Logo"
              className="lg:w-32 w-24 md:w-28 object-contain mt-6"
              width={100}
              height={100}
            />
            <h1 className="text-2xl font-semibold">
              Poké<span className="text-primary">book</span>
            </h1>
          </header>
          <div>
            <Searchbar variant="skeleton" />
          </div>
          <Theme.ThemeButton active onClick={() => setShowThemeOverlay(true)} />
        </nav>

        {loading && (
          <div className="h-full flex flex-col justify-center items-center">
            <span className="bg-primary w-8 h-8 rounded-full animate-ping block mt-5"></span>
            <h2>Loading</h2>
          </div>
        )}

        {!loading && (
          <div className="container h-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 py-10">
            {pokemonList.map((item, i) => {
              return (
                <div key={i} className="col-span-1">
                  <Pokemon
                    data={item}
                    handleViewClick={() => setViewDetails(true)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {!loading && (
          <div className="mt-auto py-3">
            <Paginator />
          </div>
        )}
      </section>
      <AboutPokemon
        visible={viewDetails}
        onBackClick={() => setViewDetails(false)}
      />
      {/* Theme Overlay */}
      <Theme.ThemeOverlay
        show={showThemeOverlay}
        onThemeClick={() => setShowThemeOverlay(false)}
      />
    </>
  );
};

export default PokemonsPage;
