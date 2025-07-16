import React, { createContext, useContext, useState } from "react";

export const ShoppingListsContext = createContext();

export const ShoppingListsProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  const toggleSaveList = (recipe) => {
    setShoppingLists((prev) => {
      const shoppingListId = recipe.id || recipe.recipeId;
      const recipeAlreadyExists = prev.find(
        (item) => item.recipeId === shoppingListId
      );
      if (recipeAlreadyExists)
        return prev.filter((item) => item.recipeId !== shoppingListId);
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

  const toggleIngredient = (recipeId, index) => {
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.recipeId !== recipeId) return list;
        return {
          ...list,
          ingredients: list.ingredients.map((i, ind) =>
            ind === index ? { ...i, checked: !i.checked } : i
          ),
        };
      })
    );
  };

  let mergeNumber = 0; // For recipeId
  const mergeShoppingLists = (recipeIds) => {
    mergeNumber++;
    const mergedIngredients = [];

    shoppingLists.forEach((list) => {
      if (recipeIds.includes(list.recipeId)) {
        mergedIngredients.push(...list.ingredients);
      }
    });

    const mergedList = {
      title: `Merged Shopping List ${mergeNumber}`,
      image: null,
      recipeId: `merge-${mergeNumber}`,
      ingredients: mergedIngredients,
    };

    setShoppingLists((prev) => [...prev, mergedList]);
  };

  return (
    <ShoppingListsContext.Provider
      value={{
        shoppingLists,
        toggleSaveList,
        toggleIngredient,
        mergeShoppingLists,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  );
};

export const useShoppingLists = () => useContext(ShoppingListsContext);
