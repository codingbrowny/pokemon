import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/images/noise2.svg')] bg-no-repeat bg-cover space-y-5">
      <Image
        src={"/images/logo.svg"}
        alt="Logo"
        className="w-80 object-contain"
        width={100}
        height={100}
      />
      <header>
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
          Poké <span className="text-coral">book</span>
        </h1>
      </header>
      <p className="font-light tracking-tight">
        Largest Pokémon index with information <br /> about every Pokemon you can think
        of.{" "}
      </p>
    </main>
  );
}
