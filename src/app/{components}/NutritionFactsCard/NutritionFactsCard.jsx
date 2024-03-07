import React from 'react';
import NutritionFactsDaily from './NutritionFactsDaily';

function NutritionFactsCard({ data }) {

  if (!data || data.length === 0) {
    console.log("No ingredients entered");
  } else {
    const totalNutrients = [data[0].totalNutrients];
    const dailyNutrients = [data[0].totalDaily];

    return (
      <div className='nutrition__card'>
        <h2>Nutrition Facts</h2>
        {data.map((item, id) => (
          <div key={id} className=''>
            <div>
              <div>
                <p>1 serving per container</p>
                <div className='nutrition__facts'>
                  <p><b>Serving Size</b></p>
                  <p>{item.totalWeight}g</p>
                </div>
              </div>
              <div>
                <span style={{ textAlign: "left", display: "block" }}>Amount per serving</span>
                <div className='nutrition__facts'>
                  <h3>Calories</h3>
                  <p>{item.calories}</p>
                </div>
              </div>
              <NutritionFactsDaily totalNutrients={totalNutrients} dailyNutrients={dailyNutrients} />
            </div>

          </div>
        ))}
      </div>
    );
  }
}

export default NutritionFactsCard;