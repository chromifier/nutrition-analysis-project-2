"use client";
import React from 'react';
import fetchData from '../api/fetchNutrition';
import Loading from '@/src/app/{components}/Loading';

const CreateRecipeForm = () => {

    async function onSubmit(event) {

        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        const ingr = formData.get("ingr")?.toString().split(",");
        setIngredients(ingr);

        fetchData(process.env.API_ENDPOINT, ingr);
    }

    return (
        <form className='mt-4 w-full' onSubmit={onSubmit}>
            <textarea placeholder="1 cup rice, 6oz grilled chicken breast" rows={4} className='ingr w-full' type="text" name="ingr" required />
            <button className='submitButton' type="submit">Submit</button>
        </form>
    );
};

export default CreateRecipeForm;