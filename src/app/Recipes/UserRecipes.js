'use client';

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NutritionFactsCard from '../{components}/NutritionFactsCard/NutritionFactsCard';

const UserRecipes = ({userEmail, updateRecipeCount}) => {
    const [recipes, setRecipes] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:3000/api/userRecipes', {
            email: userEmail,
        })
        .then(function (response) {
            setRecipes(response.data.recipes);
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
    

  return (
    <div>
        {
        loaded 
        ?
            <div>
                <h2>{recipes.length > 1 ? `You have ${recipes.length} recipes saved` : `You have ${recipes.length} recipe saved`}</h2>
                {recipes.map((recipe, index) => (
                    <div className='flex items-center' id={"recipe__"+recipe.id} key={index}>
                        <div className='card shadow-xl  bg-sky-300 bg-opacity-30 glass'>
                            <div className='card-body'>
                                <h2 className='card-title'>"{recipe.recipeName}"</h2>
                                <ul className='p-4'>
                                    <li>Recipe Ingredients: {recipe.ingredients.join(", ")}</li>
                                    <li>Recipe Calories: {recipe.nutritionFacts[0]?.calories}</li>
                                    <li>Date Created: {recipe.dateCreated}</li>
                                    <button className='btn btn-sky-500 toggleHide__btn mt-4' onClick={() => toggleContainer(index)}>Show/Hide Nutrition Facts</button>
                                </ul>
                            </div>
                            
                            <div className='flex flex-col items-center gap-4 card-actions'>
                                <div className='toggleHide__container' style={{maxHeight: "0px", overflow:"hidden"}} id={"nutritionFacts__"+index}>
                                    <NutritionFactsCard key={index} data={recipe?.nutritionFacts} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                ))}
            </div>
        :
            <div>
                <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
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