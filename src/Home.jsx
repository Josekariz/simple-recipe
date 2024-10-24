import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChefHat, Calendar } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [mealOfTheDay, setMealOfTheDay] = useState(null);
  const navigate = useNavigate();

  // Get initial values from URL params
  const query = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedArea = searchParams.get('area') || '';

  const getMeals = useCallback(async () => {
    let url;
    try {
      if (selectedCategory) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      } else if (selectedArea) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      } else if (query) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      } else {
        // Default search if no filters are applied
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const response = await fetch(url);
      const data = await response.json();

      // If we only got basic meal info, fetch full details for each meal
      if (selectedCategory || selectedArea) {
        const detailedMeals = await Promise.all(
          (data.meals || []).map(async (meal) => {
            const detailResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailResponse.json();
            return detailData.meals[0];
          })
        );
        setMeals(detailedMeals);
      } else {
        setMeals(data.meals || []);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
    }
  }, [query, selectedCategory, selectedArea]);

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals);
    };

    const fetchAreas = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setAreas(data.meals);
    };

    fetchCategories();
    fetchAreas();
  }, []);

  const updateSearch = (e) => setSearch(e.target.value);


  const getSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (search) {
      newParams.set('q', search);
      newParams.delete('category');
      newParams.delete('area');
    }
    setSearchParams(newParams);
    setSearch("");
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
      newParams.delete('q');
      newParams.delete('area');
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (area) {
      newParams.set('area', area);
      newParams.delete('q');
      newParams.delete('category');
    } else {
      newParams.delete('area');
    }
    setSearchParams(newParams);
  };

  const fetchRandomMealAndNavigate = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    navigate(`/recipe/${data.meals[0].idMeal}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={fetchRandomMealAndNavigate}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <ChefHat size={20} />
              Random Recipe
            </button>
            
            <form onSubmit={getSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  value={search}
                  onChange={updateSearch}
                  placeholder="Search recipes..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="flex gap-2">
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.strCategory} value={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
              </select>

              <select
                onChange={handleAreaChange}
                value={selectedArea}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Areas</option>
                {areas.map((area) => (
                  <option key={area.strArea} value={area.strArea}>
                    {area.strArea}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {mealOfTheDay && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={24} className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Meal of the Day</h2>
            </div>
            <Link to={`/recipe/${mealOfTheDay.idMeal}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={mealOfTheDay.strMealThumb} 
                      alt={mealOfTheDay.strMeal} 
                      className="w-full h-72 md:h-96 object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{mealOfTheDay.strMeal}</h3>
                    <div className="flex gap-2 mb-4">
                      {mealOfTheDay.strCategory && (
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          {mealOfTheDay.strCategory}
                        </span>
                      )}
                      {mealOfTheDay.strArea && (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          {mealOfTheDay.strArea}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 line-clamp-4 mb-4">
                      {mealOfTheDay.strInstructions}
                    </p>
                    <span className="inline-block text-blue-600 hover:text-blue-700">
                      View Full Recipe →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals && meals.map((meal) => (
            <Link
              to={`/recipe/${meal.idMeal}`}
              key={meal.idMeal}
              state={{ from: `${window.location.pathname}${window.location.search}` }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl mb-2 text-gray-800">{meal.strMeal}</h2>
                  <div className="flex gap-2 flex-wrap">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;