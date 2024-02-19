import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      <main className="bg-[url('/hero.webp')] bg-cover">
        {
          session ?
            (<h1>Welcome, {session?.user?.name}</h1>)
            :
            (
              <div className="flex-col text-center ">
                <h1 className="mb-4">Welcome to FreshForkfuls</h1>
                <p>Transform Your Meals, Transform Your Life - Start Crafting Nutrition Recipes That Fuel Your Joy!</p>
              </div>
            )
        }
      </main>
    </>
  );
}