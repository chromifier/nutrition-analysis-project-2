'use client'

import React, { useState} from 'react'
import LookupNutritionForm from './LookupNutritionForm';
import NutritionFactsCard from '../{components}/NutritionFactsCard/NutritionFactsCard';

const LookupNutritionWrapper = ({userEmail}) => {
    const [nutritionFacts, setNutritionFacts] = useState();
    const updateNutritionFacts = (newData) => {
        setNutritionFacts(newData);
        console.log("Nutrition Facts Updated ", nutritionFacts);
    };

  return (
    <div className='flex max-w-[600px] w-full justify-center flex-col items-center gap-4'>
        <LookupNutritionForm email={userEmail} nutritionResults={nutritionFacts} updatedNutritionResults={updateNutritionFacts} />
        <NutritionFactsCard data={nutritionFacts} />
    </div>
  )
}

export default LookupNutritionWrapper