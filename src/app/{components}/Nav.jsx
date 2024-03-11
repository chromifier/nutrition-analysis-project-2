import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

const Nav = async () => {
  const session = await getServerSession(options);
  // const router = useRouter();
  return (
    <div className='absolute top-0 w-full bg-secondary text-secondary-content'>
      <div className='flex flex-row p-4 justify-center gap-6'>
        <Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/">Home</Link>
        <Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/LookupNutrition">Lookup Nutrition Facts</Link>

        {session ?
          (
            <>
              <Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/CreateRecipe">Create A Recipe</Link>
              <Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/Recipes">My Recipes</Link>
              <Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/api/auth/signout?callbackUrl=/">Log out</Link>
            </>
          )
          :
          (<Link className='border-b-2 border-transparent hover:border-primary transition-all' href="/api/auth/signin?callbackUrl=/">Log in</Link>)}
      </div>

    </div>
  );
};

export default Nav;