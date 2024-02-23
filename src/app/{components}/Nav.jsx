import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <div className='absolute top-0 w-full bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className='flex flex-row p-4 justify-center gap-6'>
        <Link className='text-white hover:text-emerald-200 transition-colors' href="/">Home</Link>
        <Link className='text-white hover:text-emerald-200 transition-colors' href="/LookupNutrition">Lookup Nutrition Facts</Link>

        {session ?
          (
            <>
              <Link className='text-white hover:text-emerald-200 transition-colors' href="/CreateRecipe">Create A Recipe</Link>
              <Link className='text-white hover:text-emerald-200 transition-colors' href="/Recipes">My Recipes</Link>
              <Link className='text-white hover:text-emerald-200 transition-colors' href="/api/auth/signout?callbackUrl=/">Log out</Link>
            </>
          )
          :
          (<Link className='text-white  hover:text-emerald-200 transition-colors' href="/api/auth/signin?callbackUrl=/">Log in</Link>)}
      </div>

    </div>
  );
};

export default Nav;