import React, { FC, HTMLAttributes } from 'react'
import Image from 'next/image';
import { FiEye } from 'react-icons/fi';
import { IPokemonData } from '@/types';
import { usePokemon } from '@/hooks/pokemon-context';

interface IPokemon {
  data: any
  handleViewClick: ()=>void
}

const Pokemon: FC<IPokemon> = ({ handleViewClick, data }) => {
  const { handlePokemonClick, pokemon } = usePokemon()

  const handleClick = () => {
    handlePokemonClick(data)
    handleViewClick()
  }

  return (
    <div className="rounded-xl p-2 bg-white drop-shadow-md group transition-all">
      <div className="image-container bg-[#F1F1F1] flex items-center justify-center rounded-xl h-36">
        <Image
          src={data?.sprites.other.dream_world.front_default}
          alt="Dragon Pokemon"
          className="lg:scale-150 -mt-16 object-contain"
          width={85}
          height={85}
        />
      </div>
      <section className="text-center py-5 flex flex-col gap-3 items-center justify-self-center">
        <h2 className="text-xl font-medium">{ data?.name }</h2>
        <div className="flex iems-center justify-center gap-3 w-full">
          <div className="flex rounded-l-full rounded-r-full bg-[#EEEEEE] p-2"></div>
          <div className="flex rounded-l-full rounded-r-full bg-[#EEEEEE] p-2"></div>
        </div>
      </section>
      <button onClick={handleClick} className="w-full hidden group-hover:view-btn transition-all duration-200 max-md:text-sm bg-coral text-white rounded-xl group-hover:flex items-center justify-between mt-auto p-2 px-4">
        <span>View Pokemon</span>
        <span>
          <FiEye />
        </span>
      </button>
    </div>
  );
}

export default Pokemon