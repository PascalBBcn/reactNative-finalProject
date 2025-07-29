import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const updateUser = firebase.auth().onAuthStateChanged(async (newUser) => {
      setUser(newUser);
    });
    return () => updateUser();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        if (user === null) return; // Wait until authentication has completed
        if (user && !user.isAnonymous) {
          const snap = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("savedRecipes")
            .get();
          const recipes = snap.docs.map((doc) => doc.data());
          setSavedRecipes(recipes);
        } else {
          const recipes = await AsyncStorage.getItem("@savedRecipes");
          setSavedRecipes(recipes ? JSON.parse(recipes) : []);
        }
      } catch (e) {
        console.error("Error loading from local storage", e);
      }
    };
    getRecipes();
  }, [user]);

  const toggleSave = async (recipe) => {
    const exists = savedRecipes.find((item) => item.id === recipe.id);
    if (user && !user.isAnonymous) {
      const docRef = firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("savedRecipes")
        .doc(recipe.id.toString());

      try {
        if (exists) {
          await docRef.delete();
          setSavedRecipes((prev) =>
            prev.filter((item) => item.id !== recipe.id)
          );
        } else {
          const recipeData = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            spoonacularScore: recipe.spoonacularScore,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
          };
          await docRef.set(recipeData);
          setSavedRecipes((prev) => [...prev, recipeData]);
        }
      } catch (e) {
        console.error("Error saving recipe", e);
      }
    } else {
      try {
        let localRecipes;
        if (exists) {
          localRecipes = savedRecipes.filter((item) => item.id !== recipe.id);
        } else {
          localRecipes = [...savedRecipes, recipe];
        }
        await AsyncStorage.setItem(
          "@savedRecipes",
          JSON.stringify(localRecipes)
        );
        setSavedRecipes(localRecipes);
      } catch (e) {
        console.error("Error saving to local storage", e);
      }
    }
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, toggleSave }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => useContext(SavedRecipesContext);

// // BEFORE USING FIREBASE, SAVING LOCALLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React, { createContext, useContext, useState } from "react";

// export const SavedRecipesContext = createContext();

// export const SavedRecipesProvider = ({ children }) => {
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   const toggleSave = (recipe) => {
//     setSavedRecipes((prev) => {
//       const recipeAlreadyExists = prev.find(
//         (item) => item.title === recipe.title
//       );
//       if (recipeAlreadyExists)
//         return prev.filter((item) => item.title !== recipe.title);
//       else return [...prev, recipe];
//     });
//   };

//   return (
//     <SavedRecipesContext.Provider value={{ savedRecipes, toggleSave }}>
//       {children}
//     </SavedRecipesContext.Provider>
//   );
// };

// export const useSavedRecipes = () => useContext(SavedRecipesContext);
