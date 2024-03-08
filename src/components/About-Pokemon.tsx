"use client";
import { TabItem } from "@/types";
import React, { FC, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { usePokemon } from "@/hooks/pokemon-context";
import PokemonStats from "./Pokemon-Stats";

interface ViewProps {
  /**Hides or show the Pokemon about window */
  visible: boolean;
  /**Executes when the back button is clicked */
  onBackClick: () => void;
}

const AboutPokemon: FC<ViewProps> = ({ visible = false, onBackClick }) => {
  const [tab, setTab] = useState<TabItem>("About");
  const { pokemon } = usePokemon()

  return (
    <div
      className={`absolute z-50 top-0 right-0 w-full h-full bg-black/30 backdrop-blur-[3px] transition-all ${
        visible ? "slideInRight" : "hidden"
      }`}
    >
      <div className="content h-full bg-slate-50 p-2 right-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 ml-auto flex flex-col">
        <div className={`relative bg-gradient-to-b from-coral/50 to-coral h-1/4 rounded-xl p-2 flex flex-col justify-between items-center`}>
          <button
            onClick={onBackClick}
            type="button"
            aria-labelledby="close"
            className="w-fit z-20 drop-shadow self-start p-2 md:p-5 rounded-xl bg-white text-xl font-bold transition-all duration-200 active:scale-90"
          >
            <BiArrowBack />
          </button>
          <Image
            src={pokemon?.sprites?.other?.dream_world?.front_default}
            alt={pokemon?.name}
            height={100}
            width={100}
            className="max-md:-mt-4 md:-mt-8 w-full h-full z-10"
          />
        </div>

        <section className="mt-5 md:mt-10">
          <header className="space-y-2 text-center py-5 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-bottom">
            <h2 className="text-xl font-medium">{pokemon?.name}</h2>
            <div className="flex iems-center justify-center gap-3 w-full">
              {pokemon?.types.map((item: any) => (
                <div
                  key={item}
                  className="flex rounded-l-full rounded-r-full bg-gray-200 px-3 text-sm"
                >
                  {item.type.name}
                </div>
              ))}
            </div>
          </header>
          <h3 className="font-semibold text-center p-2">{tab}</h3>
          {tab === "About" && (
            <div className="details bg-gradient-to-r from-gray-50 via-gray-200/80 to-gray-50 divide-y divide-gray-200">
              <div className="flex gap-8 p-2">
                <span className="w-full text-right">Height</span>
                <span className="w-full text-left font-bold">
                  {pokemon?.height}m
                </span>
              </div>
              <div className="flex gap-8 p-2">
                <span className="w-full text-right">Weight</span>
                <span className="w-full text-left font-bold">
                  {pokemon?.weight}kg
                </span>
              </div>
              <div className="flex gap-8 p-2">
                <span className="w-full text-right">Abilities</span>
                <div className="w-full">
                  {pokemon?.abilities.map((item: any) => (
                    <span key={item} className="text-left font-bold block">
                      {item?.ability?.name},
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "Stats" && <PokemonStats />}
        </section>

        {/* Details Tab */}
        <div className="bg-white mt-auto py-5">
          <div className="flex items-center justify-between gap-3 max-md:p-1 p-2 rounded-x-full bg-[#E9E9E9] w-full md:w-4/5 mx-auto">
            {Array.from<TabItem>(["About", "Stats", "Similar"]).map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`rounded-x-full px-3 p-2 w-full ${
                  tab === item ? "bg-white drop-shadow-md" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPokemon;
