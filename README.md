Here’s the updated README with emojis added for a more engaging presentation:

---

# 🍽️ Simple Recipe App

## Overview

The Simple Recipe App is a web application that allows users to browse and discover various recipes. Users can view recipe details and access random recipes. The application is built using React and utilizes Tailwind CSS for styling.

## Features

- **Browse Recipes:** 🥘 View a list of recipes rendered as cards on the home page.
- **Recipe Details:** 📖 Click on a recipe card to view detailed information about the recipe.
- **Random Recipe:** 🎲 Get a random recipe displayed on the details page.
- **Back to Home:** 🔙 Navigate back to the home page from the recipe details page.

## Technologies Used

- React ⚛️
- Tailwind CSS 🎨
- React Router 🛤️

## API

This application uses the **MealDB API** to fetch recipe data. The following API endpoints are utilized:

### Free API Endpoints

- **Search meal by name:**
  ```
  https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}
  ```
- **List all meals by first letter:**
  ```
  https://www.themealdb.com/api/json/v1/1/search.php?f={letter}
  ```
- **Lookup full meal details by ID:**
  ```
  https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}
  ```
- **Lookup a single random meal:**
  ```
  https://www.themealdb.com/api/json/v1/1/random.php
  ```
- **List all meal categories:**
  ```
  https://www.themealdb.com/api/json/v1/1/categories.php
  ```

### Test API Key

You can use the test API key `"1"` during the development of your app or for educational purposes. 🛠️

### Note

While the API and site will always remain free at the point of access, you may need to upgrade for premium features in the future if releasing publicly. 🚀

## Installation

To get started with this project:

1. Clone the repository:
   ```bash
   git clone https://github.com/Josekariz/simple-recipe.git
   ```

2. Navigate into the project directory:
   ```bash
   cd simple-recipe
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Visit the home page to view a list of recipes. 🏠
- Click on a recipe card to view detailed information. 📜
- Use the "Get Random Recipe" button to display a random recipe on the details page. 🎉

## Contribution

Feel free to fork the repository and submit pull requests. Your contributions are welcome! 🤝

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 📄
