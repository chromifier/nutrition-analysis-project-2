"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/src/app/{components}/Loading';
import LookupNutritionForm from './LookupNutritionForm';
import NutritionFactsCard from '../{components}/NutritionFactsCard/NutritionFactsCard';

const LookupNutrition = () => {
    const [nutritionFacts, setNutritionFacts] = useState();

    const updateNutritionFacts = (newData) => {
        setNutritionFacts(newData);
        console.log("Nutrition Facts Updated ", nutritionFacts);
    };

    return (
        <div className='flex items-center flex-col text-center w-full mt-20'>
            <h1>Lookup Nutrition Facts</h1>
            <div className='flex max-w-[600px] w-full justify-center flex-col items-center gap-4'>
                <LookupNutritionForm nutritionResults={nutritionFacts} updatedNutritionResults={updateNutritionFacts} />
                <NutritionFactsCard data={nutritionFacts} />
            </div>
        </div>
    );
};

export default LookupNutrition;