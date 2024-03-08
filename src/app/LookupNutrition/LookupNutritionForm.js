import React, { useEffect, useState } from 'react';
import axios from "axios";
import fetchNutrition from '../api/fetchNutrition';
import Loading from '@/src/app/{components}/Loading';

const LookupNutritionForm = ({ email, nutritionResults, updatedNutritionResults }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState(null);
    const [response, setResponse] = useState(null);
    const API_ENDPOINT = "https://api.edamam.com/api/nutrition-details?app_id=bfd3dd4e&app_key=1be5ec5657603359399a2f72c545c9a0";


	function clearLookupData() {
		setIngredients(null);
		updatedNutritionResults(null);
		document.getElementById("ingredients").value = "";
	}

    async function onSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		let nutritionFactsResponse;

		const formData = new FormData(event.target);

		const save = formData.get("save") ? true : false;
		const ingr = formData.get("ingr")?.toString().split(",");

		setIngredients(ingr);

		const fetch = await fetchNutrition(API_ENDPOINT, ingr).then((data) => {
			setIsLoading(false);
			setResponse([data]);
            updatedNutritionResults([data]);
			nutritionFactsResponse = [data];
			console.log([data]);
		})
			.catch((error) => {
				console.log('error in fetchData', error.message);
			});

		console.log("nutritionFactsResponse: ", nutritionFactsResponse);

		if (save) {
			axios.post('http://localhost:3000/api/insertRecipe', {
				ingredients: ingr,
				email: email,
				nutritionFacts: nutritionFactsResponse
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

    return (
		<>
			<form className='mt-4 w-full' onSubmit={onSubmit}>
				<textarea placeholder="1 cup rice, 6oz grilled chicken breast" id="ingredients" rows={4} className='ingr w-full' type="text" name="ingr" required />
				<div className='flex flex-col justify-center gap-6'>
					<label>Save Ingredients & Nutrition Facts on Submit <input type="checkbox" name="save" id="save" /></label>
					<button className='submitButton' type="submit">Submit</button>
				</div>
			</form>
			<button className='mt-4 bg-amber-800 hover:bg-amber-700 transition-colors' onClick={clearLookupData}>Clear</button>
		</>
        
    );
};

export default LookupNutritionForm;