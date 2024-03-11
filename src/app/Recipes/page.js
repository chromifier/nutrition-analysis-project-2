import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from "next/navigation";
import UserRecipes from './UserRecipes';

const recipes = async () => {
    const session = await getServerSession(options);
    const userEmail = session?.user?.email;
    const userName = session?.user.name;

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/Recipes");
    }

    return (
        <div className='flex items-center flex-col text-center w-full'>
            <h1 className='text-slate-100'>Hello, {userName}!</h1>
            <UserRecipes userEmail={userEmail} />
        </div>
    );
};

export default recipes;