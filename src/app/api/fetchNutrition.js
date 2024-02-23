async function fetchData(url, ingr) {
  await fetchNutrition(url, ingr).then((data) => {
    console.log("fetchData results ", [data]);
    return data;
  })
  .catch((error) => {
    console.log("error in fetchData", error.message)
  });
};

export default async function fetchNutrition(url, ingr) {
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "ingr": ingr
          })
        });
  
        // Checking if the request was successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Parsing the response JSON
        const data = await response.json();
        return data;
      } catch (error) {
        // Handling any errors that might occur during the fetch operation
        console.error('Error fetching data:', error.message);
  
        throw error; // Optionally rethrow the error for further handling
      }
}