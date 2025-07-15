import React, { createContext, useContext, useState } from "react";

export const ShoppingListsContext = createContext();

export const ShoppingListsProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  const toggleSaveList = (recipe) => {
    setShoppingLists((prev) => {
      const exists = prev.find((item) => item.recipeId === recipe.id);
      if (exists) return prev.filter((item) => item.recipeId !== recipe.id);
      else {
        // New recipe also includes a custom "checked" variable to check ingredients in shoppingList
        const newRecipe = {
          title: recipe.title,
          image: recipe.image,
          recipeId: recipe.id,
          ingredients: recipe.ingredients.map((i) => ({
            ...i,
            checked: false,
          })),
        };
        return [...prev, newRecipe];
      }
    });
  };

  const toggleIngredient = (recipeId, ingredient) => {
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.recipeId !== recipeId) return list;
        return {
          ...list,
          ingredients: list.ingredients.map((i) =>
            i.name === ingredient ? { ...i, checked: !i.checked } : i
          ),
        };
      })
    );
  };

  return (
    <ShoppingListsContext.Provider
      value={{ shoppingLists, toggleSaveList, toggleIngredient }}
    >
      {children}
    </ShoppingListsContext.Provider>
  );
};

export const useShoppingLists = () => useContext(ShoppingListsContext);
