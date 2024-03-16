'use client';

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NutritionFactsCard from '../{components}/NutritionFactsCard/NutritionFactsCard';
import trashSVG from '@/public/trash.svg';
import Image from 'next/image';

const UserRecipes = ({userEmail, updateRecipeCount}) => {
    const [recipes, setRecipes] = useState();
    const [recipeCount, setRecipeCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:3000/api/userRecipes', {
            email: userEmail,
        })
        .then(function (response) {
            setRecipes(response.data.recipes);
            setRecipeCount(response.data.recipes.length);
            setLoaded(true);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [userEmail])

    function toggleContainer(index) {
        const container = document.getElementById("nutritionFacts__"+index);
        container.style.maxHeight = container.style.maxHeight === '0px' ? '100%' : '0px';
    }
    
    function deleteRecipe(id) {
        console.log("deleting recipe id:", id);
        console.log("recipe__"+id)
        

        axios.post('http://localhost:3000/api/deleteRecipe', {
            recipeID: "id",
        })
        .then(function (response) {
            console.log(response);
        
            recipes.map((recipe, index) => {
                let recipesCopy = recipes;
                if (id === recipe.id) {
                    recipesCopy.splice(index, 1)
                    setRecipes(recipesCopy);
                    setRecipeCount(recipesCopy.length);
                    document.getElementById("recipe__"+id).style.display = 'none';
                }
            });

        })
        .catch(function (error) {
            console.log(error);

            recipes.map((recipe, index) => {
                let recipesCopy = recipes;
                if (id === recipe.id) {
                    recipesCopy.splice(index, 1)
                    document.getElementById("recipe__"+id).style.display = 'none';
                    // setRecipes(recipesCopy);
                    // setRecipeCount(recipesCopy.length);
                }
            });
        });
    }

  return (
    <div>
        {
        loaded 
        ?
        <div className="flex flex-col p-4">
            <h2 className='mt-4 mb-4'>{recipeCount > 1 ? `You have ${recipeCount} recipes saved` : `You have ${recipeCount} recipe saved`}</h2>
            <div className='grid grid-cols-1 items-center lg:grid-cols-2 justify-center gap-10'>
                {recipes.map((recipe, index) => (
                    <div id={"recipe__"+recipe.id} key={index}>
                        <div className='card shadow-xl bg-neutral bg-opacity-90 glass text-neutral-content max-w-[430px]'>
                            <div className='card-body'>
                                <h2 className='card-title relative'>&quot;{recipe.recipeName}&quot; <Image onClick={() => deleteRecipe(recipe.id)} className='trashCan hover:scale-110 transition-all hover:cursor-pointer right-0 absolute' src={trashSVG.src} width={25} height={25} alt="Trash Can" /></h2>
                                <ul className='p-4'>
                                    <li>Recipe Ingredients: {recipe.ingredients.join(", ")}</li>
                                    <li>Recipe Calories: {recipe.nutritionFacts[0]?.calories}</li>
                                    <li>Date Created: {recipe.dateCreated}</li>
                                    <button className='btn btn-info toggleHide__btn mt-4' onClick={() => toggleContainer(index)}>Show/Hide Nutrition Facts</button>
                                </ul>
                                <div className='flex flex-col items-center gap-4 card-actions'>
                            <div className='toggleHide__container' style={{maxHeight: "0px", overflow:"hidden"}} id={"nutritionFacts__"+index}>
                                <NutritionFactsCard key={index} data={recipe?.nutritionFacts} />
                            </div>
                        </div>
                            </div>
                        </div>
                        
                    </div>
                    
                ))}
            </div>
        </div>
            
        :
            <div>
                <svg className='loading' version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
                    <rect fill="none" stroke="#fff" strokeWidth="4" x="25" y="25" width="50" height="50">
                        <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform>
                    </rect>
                    <rect x="27" y="27" fill="#fff" width="46" height="50">
                        <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate>
                    </rect>
                </svg>
            </div>
        }
    </div>
  )
}

export default UserRecipes