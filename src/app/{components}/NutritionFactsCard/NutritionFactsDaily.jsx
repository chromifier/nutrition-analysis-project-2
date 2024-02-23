import React from 'react';

function NutritionFactsDaily({ totalNutrients, dailyNutrients, displayLabel = true }) {
	// console.log(totalNutrients[0].CA);	
	// console.log(dailyNutrients[0].CA.quantity);


	return (
		<div className='nutrients__container'>
			<p style={{textAlign:"right"}}>% Daily Value</p>
			{// Use this to help with displaying the totalNutrients and totalDaily :D
				Object.entries(totalNutrients).map(([nutrient, values]) => (
					// <p>{nutrient}</p>
					Object.entries(values).map(([property, value]) => {
						const roundedQuantity = value.quantity.toFixed(1);
						const roundedDaily = dailyNutrients[0][property]?.quantity.toFixed(1);

						return (
							<div key={property} className='nutrition__facts'>
								<div>
									{displayLabel ? <h3>{value.label}</h3> : ""}
								<p>{roundedQuantity}{value.unit}</p>
								</div>
								<div>
									<p>{roundedDaily && roundedDaily + "%"}</p>
								</div>
							</div>
						);

					})
				))
			}
		</div>
	);
}

export default NutritionFactsDaily;