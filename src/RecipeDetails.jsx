import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetchMeal(recipeId);
  }, [recipeId]);

  const fetchMeal = async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    setMeal(data.meals[0]);
  };

  const fetchRandomMeal = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();
    const randomMeal = data.meals[0];
    setMeal(randomMeal);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Back to Home
        </Link>
        <button
          onClick={fetchRandomMeal}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Show Random Recipe
        </button>
      </div>
      {meal ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="font-semibold mt-4">Ingredients:</h3>
          <ul>
            {Object.keys(meal)
              .filter(key => key.includes('strIngredient') && meal[key])
              .map((ingredient, index) => (
                <li key={index}>{meal[ingredient]}</li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Instructions:</h3>
          <p>{meal.strInstructions || "No instructions available."}</p>
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
