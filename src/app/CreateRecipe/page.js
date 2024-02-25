import React from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import CreateRecipeForm from './CreateRecipeForm';


const CreateRecipe = async () => {
    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/CreateRecipe");
    }

    return (
        <div className='flex items-center flex-col text-center w-full'>
            <h1>Hi {session?.user?.name}, Create A New Recipe</h1>
                <div className='flex max-w-[600px] w-full justify-center'>
                    <CreateRecipeForm  />
                </div>
        </div>
    );
};

export default CreateRecipe;