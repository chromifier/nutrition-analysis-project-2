"use client";

import axios from "axios";
import fetchNutrition from "../api/fetchNutrition";
import { useState } from 'react'

const CreateRecipeForm = ({email}) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    async function onSubmit(event) {
        setLoading(true);
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
            setLoading(false);
            setSubmitted(true);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
            <form className='mt-4 w-full card rounded-xl border-2 border-base-300 shadow-xl p-6 bg-neutral' onSubmit={onSubmit}>
                <input className="mb-4 p-2 rounded input input-bordered bg-neutral-400 bg-opacity-50 text-neutral-content" type="text" name="recipeName" placeholder="My Recipe Name"/>
                <textarea placeholder="1 cup rice, 6oz grilled chicken breast" id="ingredients" rows={4} className='bg-neutral-400 bg-opacity-50 text-neutral-content ingr w-full textarea textarea-bordered' type="text" name="ingr" required />
                <div className='flex flex-row justify-center gap-6 items-center mt-4'>
                    <button className='btn btn-success' type="submit">
                        Create
                        {
                            loading
                            ?
                            <svg className="loading" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                                </path>
                            </svg>
                            :
                            null
                        }
                        
                        
                    </button>
                    {submitted ? <p className="text-success">Recipe Created</p> : null}
                </div>
            </form>
        </>

    );
};

export default CreateRecipeForm;