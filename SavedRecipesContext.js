import React, { createContext, useContext, useState } from "react";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const toggleSave = (recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.find((item) => item.title === recipe.title);
      if (exists) return prev.filter((item) => item.title !== recipe.title);
      else return [...prev, recipe];
    });
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, toggleSave }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => useContext(SavedRecipesContext);
