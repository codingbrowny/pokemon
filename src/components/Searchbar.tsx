"use client";
import { usePokemon } from "@/hooks/pokemon-context";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FiSearch } from "react-icons/fi";

type Variant = "skeleton" | "colorful";

const Searchbar: FC<{ variant?: Variant }> = ({ variant = "colorful" }) => {
  const { handleSearch, search:searchTerm } = usePokemon();
  const [search, setSearch] = useState("");
  const router = useRouter();
  function handleSearchClick() {
    handleSearch(search);
    variant === "colorful" && router.replace("/pokemons");
  }
  return (
    <>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>

      <div className="relative w-full bg-transparent">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          id="pokemon-search"
          className={`block w-full bg-transparent p-4 rounded-l-full rounded-r-full outline-none placeholder:text-gray-400 text-gray-400 ${
            variant === "colorful"
              ? "border-[6px] border-primary rounded-r-full pe-10"
              : "ps-10 py-2 border-2 border-gray-300 shadow-md"
          }`}
          placeholder="Enter pokemon name"
          required
        />
        <button
          disabled={variant === "skeleton"}
          onClick={() => handleSearchClick()}
          type="submit"
          className={`absolute text-sm p-3 rounded-full transition-all duration-200 ${
            variant === "colorful"
              ? "text-white bg-primary shadow-md active:scale-95 end-4 top-3"
              : "start-0.5 top-0.5 text-gray-500"
          }`}
        >
          <FiSearch className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
