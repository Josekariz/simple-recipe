import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const navigate = useNavigate();

  useEffect(() => {
    getMeals();
  }, [query]);

  const getMeals = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setMeals(data.meals);
  };

  const updateSearch = (e) => setSearch(e.target.value);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const fetchRandomMealAndNavigate = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();
    const randomMeal = data.meals[0];
    
    navigate(`/recipe/${randomMeal.idMeal}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex justify-between items-center p-4 bg-white shadow-md mb-8">
        <button
          onClick={fetchRandomMealAndNavigate}
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
        {meals && meals.map((meal) => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-gray-500">Category: {meal.strCategory}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
