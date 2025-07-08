import React, { createContext, useContext, useState } from "react";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const toggleSave = (title, imgUri) => {
    setSavedRecipes((prev) => {
      const exists = prev.find((item) => item.title === title);
      if (exists) return prev.filter((item) => item.title !== title);
      else return [...prev, { title, imgUri }];
    });
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, toggleSave }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => useContext(SavedRecipesContext);
