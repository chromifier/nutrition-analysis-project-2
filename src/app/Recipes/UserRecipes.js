'use client';

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NutritionFactsCard from '../{components}/NutritionFactsCard/NutritionFactsCard';

const UserRecipes = ({userEmail}) => {
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

    if (loaded) {
        console.log(recipes);
        recipes.map((recipe) =>  {
            console.log(recipe?.nutritionFacts)
        })
    }

    function toggleContainer(index) {
        const container = document.getElementById("nutritionFacts__"+index);
        console.log("toggling ", "nutritionFacts__"+index)

        container.style.maxHeight = container.style.maxHeight === '0px' ? '100%' : '0px';
    }
    

  return (
    <div>
        {
        loaded 
        ?
            <>
                <div>
                    <h3>Ingredients</h3>
                    {recipes.map((recipe, index) => (
                        <div key={index}>
                            <ul className='p-4'>
                                <li>Recipe ID: {recipe.id}</li>
                                <li>Recipe Ingredients: {recipe.ingredients.join(", ")}</li>
                                <li>Recipe Calories: {recipe.nutritionFacts[0]?.calories}</li>
                            </ul>
                            <div className='flex flex-col items-center gap-4'>
                                <button className='btn btn-sky-500 toggleHide__btn' onClick={() => toggleContainer(index)}>Show/Hide Nutrition Facts</button>
                                <div className='toggleHide__container' style={{maxHeight: "0px", overflow:"hidden"}} id={"nutritionFacts__"+index}>
                                    <NutritionFactsCard key={index} data={recipe?.nutritionFacts} />
                                </div>
                            </div>
                            
                        </div>
                        
                    ))}
                </div>
                <div>
                    <h3>Nutrition Facts</h3>
                    {/* {recipes.map((recipe, index) => (
                        
                    ))} */}
                </div>
                
            </>
            
        :
            null
        }
    </div>
  )
}

export default UserRecipes