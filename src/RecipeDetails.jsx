import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe(recipeId);
  }, [recipeId]);

  const fetchRecipe = async (id) => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipe(data.hits[id].recipe);
  };

  const fetchRandomRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    setRecipe(data.hits[randomIndex].recipe);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Back to Home
        </Link>
        <button
          onClick={fetchRandomRecipe}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Show Random Recipe
        </button>
      </div>
      {recipe ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{recipe.label}</h1>
          <img src={recipe.image} alt={recipe.label} className="w-full h-40 object-cover rounded-md mb-2" />
          <p className="text-gray-500">Calories: {recipe.calories.toFixed(2)}</p>
          <h3 className="font-semibold mt-4">Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Steps:</h3>
          <p>{recipe.instructions || "No instructions available."}</p>
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
