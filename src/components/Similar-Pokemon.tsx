import React from 'react'
import Image from 'next/image';

const SimilarPokemon = ({data}:{data:any}) => {
  return (
    <div className="rounded-xl p-2 bg-white drop-shadow-md group transition-all">
      <div className="image-container bg-[#F1F1F1] flex items-center justify-center rounded-xl h-36">
        <Image
          src={data?.sprites.other.dream_world.front_default}
          alt="Dragon Pokemon"
          className="lg:scale-120 object-contain"
          width={100}
          height={100}
          priority
        />
      </div>
      <section className="text-center py-5 flex flex-col gap-3 items-center justify-self-center">
        <h2 className="text-xl font-medium">{data?.name}</h2>
      </section>
    </div>
  );
}

export default SimilarPokemon