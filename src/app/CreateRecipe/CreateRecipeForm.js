"use client";

import axios from "axios";

const CreateRecipeForm = ({email}) => {
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const ingr = formData.get("ingr")?.toString().split(",");
        let nutritionFactsResponse;
        const currentDateTime = Date.now();

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
            name: recipeName,
            dateCreate: currentDateTime
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