import { Searchbar } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 max-md:p-12 max-md:px-8 gap-5 lg:gap-4">
      <Image
        src={"/images/logo.svg"}
        alt="Logo"
        className="lg:w-80 w-52 md:w-64 object-contain"
        width={100}
        height={100}
      />
      <header>
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
          Poké <span className="text-primary">book</span>
        </h1>
      </header>
      <p className="font-light tracking-tight lg:mt-3 text-center">
        Largest Pokémon index with information <br className="max-md:hidden" />{" "}
        about every Pokemon you can think of.{" "}
      </p>

      <div className="searchbar relative w-full md:w-80 lg:w-96 bg-none max-md:mt-5 md:mt-12 lg:mt-16 text-center space-y-5">
        <Searchbar />
        <Link href={"/pokemons"} className="underline text-gray-700 text-sm block">View all</Link>
      </div>
    </main>
  );
}
