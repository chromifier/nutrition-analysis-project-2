"use client";

import axios from "axios";

const CreateRecipeForm = ({email}) => {
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const ingr = formData.get("ingr")?.toString().split(",");

        axios.post('http://localhost:3000/api/insertRecipe', {
            ingredients: ingr,
            email: email
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
                <textarea placeholder="1 cup rice, 6oz grilled chicken breast" id="ingredients" rows={4} className='ingr w-full' type="text" name="ingr" required />
                <div className='flex flex-row justify-center gap-6'>
                    <button className='submitButton' type="submit">Create</button>
                </div>
            </form>
        </>

    );
};

export default CreateRecipeForm;