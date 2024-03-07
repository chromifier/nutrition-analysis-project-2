import Loading from '@/src/app/{components}/Loading';
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import LookupNutritionWrapper from './LookupNutritionWrapper';

const LookupNutrition = async () => {
    const session = await getServerSession(options);
    const email= session?.user?.email;

    return (
        <div className='flex items-center flex-col text-center w-full mt-20'>
            <h1>Lookup Nutrition Facts</h1>
            <LookupNutritionWrapper userEmail={email} />
        </div>
    );
};

export default LookupNutrition;