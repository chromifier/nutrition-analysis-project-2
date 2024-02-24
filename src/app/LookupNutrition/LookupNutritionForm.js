import React, { useEffect, useState } from 'react';
import fetchNutrition from '../api/fetchNutrition';
import Loading from '@/src/app/{components}/Loading';

const LookupNutritionForm = ({ nutritionResults, updatedNutritionResults }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState(null);
    const [response, setResponse] = useState(null);
    const API_ENDPOINT = "https://api.edamam.com/api/nutrition-details?app_id=bfd3dd4e&app_key=1be5ec5657603359399a2f72c545c9a0";



    async function onSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.target);
		const ingr = formData.get("ingr")?.toString().split(",");
		setIngredients(ingr);

		const fetch = await fetchNutrition(API_ENDPOINT, ingr).then((data) => {
			setIsLoading(false);
			setResponse([data]);
            updatedNutritionResults([data]);
			console.log([data]);
		})
			.catch((error) => {
				console.log('error in fetchData', error.message);
			});
	}

    return (
        <form className='mt-4 w-full' onSubmit={onSubmit}>
            <textarea placeholder="1 cup rice, 6oz grilled chicken breast" rows={4} className='ingr w-full' type="text" name="ingr" required />
			<div className='flex flex-row justify-center gap-6'>
				<button className='submitButton' type="submit">Submit</button>
				<button className='mt-4 bg-amber-800'>Clear</button>
			</div>
        </form>
    );
};

export default LookupNutritionForm;