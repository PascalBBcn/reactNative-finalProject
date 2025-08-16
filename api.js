import { SPOONACULAR_API_KEY } from "@env";
// SPOONACULAR API KEY, FREE VERSION (MAX 150 QUERIES A DAY)
const apiKey = SPOONACULAR_API_KEY;

// Used by Homescreen
export const getHotRecipes = async () => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?&sort=popularity&number=4&apiKey=${apiKey}`;
  const res = await fetch(url);
  const recipes = await res.json();
  return recipes.results;
};

// Used by Homescreen & Search
export const getDetailedInfo = async (recipes) => {
  const details = recipes.map((recipe) => {
    const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
    return fetch(url)
      .then((res) => res.json())
      .then((info) => ({
        ...recipe,
        spoonacularScore: info.spoonacularScore.toFixed(0),
        readyInMinutes: info.readyInMinutes,
        servings: info.servings,
        ingredients: info.extendedIngredients,
        instructions: info.analyzedInstructions,
      }));
  });
  return Promise.all(details);
};

// Used by  Search
export const getDetailedInfoByQuery = async (
  query,
  { number = 1, offset = 0, sort = "popularity", sortDirection = "desc" } = {}
) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&sort=${sort}&sortDirection=${sortDirection}&number=${number}&offset=${offset}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const recipes = await res.json();
  const fullRecipes = await getDetailedInfo(recipes.results);

  return { fullRecipes, totalResults: recipes.totalResults };
};
