import { usePokemon } from "@/hooks/pokemon-context";
import React from "react";

const PokemonStats = () => {
  const { pokemon } = usePokemon();
  return (
    <div className="w-4/5 mx-auto">
      {pokemon?.stats.map((items: any) => (
        <div key={items} className="flex items-center gap-8 p-2">
          <span className="w-full text-right capitalize">
            {items.stat.name}
          </span>
          <div className="w-full flex items-center gap-3">
            <div className="w-full text-left font-bold relative h-2 rounded-x-full overflow-hidden bg-slate-300">
              <div
                className="absolute left-0 top-0 h-full rouded-x-full bg-primary"
                style={{ width: `${items.base_stat}%` }}
              ></div>
            </div>
            <span>{items.base_stat}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
