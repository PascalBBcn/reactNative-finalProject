import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";
export const ShoppingListsContext = createContext();

export const ShoppingListsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    const updateUser = firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
    return () => updateUser();
  }, []);

  useEffect(() => {
    if (user === null) return;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("shoppingLists")
      .onSnapshot((snapshot) => {
        const lists = snapshot.docs.map((doc) => doc.data());
        setShoppingLists(lists);
      });
    return () => unsubscribe();
  }, [user]);

  const toggleSaveList = async (recipe) => {
    if (user === null) return;
    const shoppingListId = recipe.id || recipe.recipeId;
    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("shoppingLists")
      .doc(shoppingListId.toString());
    const exists = shoppingLists.find(
      (item) => item.recipeId === shoppingListId
    );

    try {
      if (exists) {
        await docRef.delete();
      } else {
        const newList = {
          title: recipe.title,
          image: recipe.image || null,
          recipeId: recipe.id,
          ingredients: recipe.ingredients.map((item) => ({
            ...item,
            checked: false,
          })),
        };
        await docRef.set(newList);
      }
    } catch (e) {
      console.error("Error saving list", e);
    }
  };

  const toggleIngredient = async (recipeId, index) => {
    if (user === null) return;
    const list = shoppingLists.find((item) => item.recipeId === recipeId);
    if (list === null) return;
    const newIngredientsList = list.ingredients.map((i, ind) =>
      ind === index ? { ...i, checked: !i.checked } : i
    );
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("shoppingLists")
        .doc(recipeId.toString())
        .update({ ingredients: newIngredientsList });
    } catch (e) {
      console.error("Error updating ingredients", e);
    }
  };

  let mergeNumber = 0; // For recipeId
  const mergeShoppingLists = async (recipeIds) => {
    if (user === null) return;
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
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("shoppingLists")
        .doc(mergedList.recipeId)
        .set(mergedList);
    } catch (e) {
      console.error("Error merging lists", e);
    }
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
