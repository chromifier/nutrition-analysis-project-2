import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import hero from "@/public/hero.webp";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      <main className="z-10">
        <Image
          src={hero}
          sizes="100vw"
          alt="hero"
          className="-z-10 absolute w-full blur-sm"
        />
        {
          session ?
            (<div className="flex-col text-center text-primary-content p-4 rounded-xl shadow-xl bg-neutral bg-opacity-40">
              <h1 className="mb-4 drop-shadow">Welcome to FreshForkfuls, {session?.user?.name}</h1>
              <p className="drop-shadow">Transform Your Meals, Transform Your Life - Start Crafting Nutrition Recipes That Fuel Your Joy!</p>
            </div>)
            :
            (
              <div className="flex-col text-center ">
                <h1 className="mb-4 drop-shadow">Welcome to FreshForkfuls</h1>
                <p className="drop-shadow">Transform Your Meals, Transform Your Life - Start Crafting Nutrition Recipes That Fuel Your Joy!</p>
              </div>
            )
        }
      </main>
    </>
  );
}