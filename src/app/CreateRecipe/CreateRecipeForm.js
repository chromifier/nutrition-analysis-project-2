"use client";

import axios from "axios";
import fetchNutrition from "../api/fetchNutrition";

const CreateRecipeForm = ({email}) => {
    async function onSubmit(event) {
        event.preventDefault();

        const API_ENDPOINT = "https://api.edamam.com/api/nutrition-details?app_id=bfd3dd4e&app_key=1be5ec5657603359399a2f72c545c9a0";
        const formData = new FormData(event.target);
        const ingr = formData.get("ingr")?.toString().split(",");
        const recipeName = formData.get("recipeName")?.toString();
        let nutritionFactsResponse;
        const currentDateTime = new Date().toLocaleString();

        const fetch = await fetchNutrition(API_ENDPOINT, ingr).then((data) => {
			nutritionFactsResponse = [data];
			console.log([data]);
		})
			.catch((error) => {
				console.log('error in fetchData', error.message);
			});

        axios.post('http://localhost:3000/api/insertRecipe', {
            ingredients: ingr,
            email: email,
            nutritionFacts: nutritionFactsResponse,
            recipeName: recipeName,
            dateCreated: currentDateTime
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
            <p>Creating recipe for userId: {email}</p>
            <form className='mt-4 w-full' onSubmit={onSubmit}>
                <input className="mb-4 p-2 rounded" type="text" name="recipeName" placeholder="My Recipe Name"/>
                <textarea placeholder="1 cup rice, 6oz grilled chicken breast" id="ingredients" rows={4} className='ingr w-full' type="text" name="ingr" required />
                <div className='flex flex-row justify-center gap-6'>
                    <button className='submitButton' type="submit">Create</button>
                </div>
            </form>
        </>

    );
};

export default CreateRecipeForm;