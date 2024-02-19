import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from "next/navigation";
import React from 'react';

const recipes = async () => {
    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/Recipes");
    }
    return (
        <div className='flex items-center flex-col text-center w-full'>
            <h1>Your Recipes</h1>
            <p>{session?.user?.email}</p>
        </div>
    );
};

export default recipes;