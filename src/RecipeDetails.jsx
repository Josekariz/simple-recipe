import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChefHat } from 'lucide-react';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchMeal(recipeId);
  }, [recipeId]);

  const fetchMeal = async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const mealData = data.meals[0];
    setMeal(mealData);

    // Extract ingredients and measures
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList.push({ ingredient, measure });
      }
    }
    setIngredients(ingredientsList);
  };

  const fetchRandomMeal = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();
    const randomMeal = data.meals[0];
    setMeal(randomMeal);
  };

  if (!meal) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Recipes
          </Link>
          <button
            onClick={fetchRandomMeal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <ChefHat size={20} />
            Try Another Random Recipe
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {meal.strCategory && (
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {meal.strArea}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{meal.strMeal}</h1>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {ingredients.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-20 text-sm text-gray-500">{item.measure}</span>
                      <span>{item.ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <div className="prose max-w-none">
                  {meal.strInstructions.split('\n').map((instruction, index) => (
                    instruction.trim() && (
                      <p key={index} className="mb-4 text-gray-700">
                        {instruction}
                      </p>
                    )
                  ))}
                </div>

                {meal.strYoutube && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
                    <a 
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;