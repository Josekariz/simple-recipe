import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => setSearch(e.target.value);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const fetchRandomRecipeAndNavigate = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    navigate(`/recipe/${randomIndex}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex justify-between items-center p-4 bg-white shadow-md mb-8">
        <button
          onClick={fetchRandomRecipeAndNavigate}
          className="mr-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Show Random Recipe
        </button>
        <h1 className="text-xl font-bold text-gray-800">Recipe Finder</h1>
        <form onSubmit={getSearch} className="flex items-center">
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            value={search}
            onChange={updateSearch}
            placeholder="Search recipes..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <Link to={`/recipe/${index}`} key={recipe.recipe.label}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-gray-500">Calories: {recipe.recipe.calories.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
