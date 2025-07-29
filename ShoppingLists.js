// I will have lists based on recipes. So a single list is related to a single recipe
// Extra feature = merging shopping lists from multiple recipes...1 tomate (recipe 1), 2 tomatoes (recipe 2) = 3 tomatoes total
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { useShoppingLists } from "./ShoppingListsContext";
import { myStyles } from "./styles";
import { useSettings, getFontSizeIncrement } from "./SettingsContext.js";
import firebase from "./firebase";

const screenHeight = Dimensions.get("window").height;

export function ShoppingLists({ navigation }) {
  // If user signed in as a guest, render this page differently
  const userIsGuest =
    firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous;

  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const { shoppingLists, toggleSaveList, mergeShoppingLists } =
    useShoppingLists();
  const [input, setInput] = useState("");

  // For functionality of merging lists together
  const [isMerging, setIsMerging] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const toggleSelectedLists = (listId) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((i) => i !== listId)
        : [...prev, listId]
    );
  };

  const mergeLists = () => {
    if (selectedLists.length < 2) return;
    mergeShoppingLists(selectedLists);
    setIsMerging(false);
    setSelectedLists([]);
  };
  let mergeButtonText = isMerging ? "Cancel" : "Merge";
  let confirmButton = null;
  if (isMerging) {
    confirmButton = (
      <TouchableOpacity onPress={() => mergeLists()}>
        <Text style={{ fontWeight: "bold" }}>Confirm</Text>
      </TouchableOpacity>
    );
  }

  const filteredRecipes = shoppingLists.filter((recipe) =>
    recipe.title.toLowerCase().includes(input.toLowerCase())
  );
  if (userIsGuest) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
        <ScrollView>
          <View style={[styles.section, { marginTop: screenHeight / 35 }]}>
            <Text style={styles.headerTwo}>
              Please sign in to use shopping lists
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
        <ScrollView>
          <View style={[styles.section, { marginTop: screenHeight / 35 }]}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#656565" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search lists"
                value={input}
                onChangeText={setInput}
              />
            </View>
          </View>
          <View style={[styles.section, { flexDirection: "row", gap: 20 }]}>
            <TouchableOpacity
              onPress={() => setIsMerging((prev) => !prev)}
              style={styles.homescreenButton}
            >
              <Text style={{ fontWeight: "bold" }}>{mergeButtonText}</Text>
            </TouchableOpacity>
            {isMerging ? (
              <TouchableOpacity
                onPress={() => setIsMerging(true)}
                style={styles.homescreenButton}
              >
                <Text>{confirmButton}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.section}>
            {filteredRecipes.map((recipe, index) => {
              const isSelected = selectedLists.includes(recipe.recipeId);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    isMerging
                      ? toggleSelectedLists(recipe.recipeId)
                      : navigation.navigate("ShoppingList", {
                          recipeId: recipe.recipeId,
                        })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{ uri: recipe.image }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        marginRight: 10,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14 + fontSizeIncr }}>
                        {recipe.title}
                      </Text>
                    </View>
                    {isMerging ? (
                      <Ionicons
                        name={isSelected ? "checkbox" : "square-outline"}
                        size={25}
                        color={"#C34946"}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "Delete list",
                            "Are you sure you want to delete this list?",
                            [
                              { text: "No", style: "cancel" },
                              {
                                text: "Yes",
                                onPress: () => {
                                  toggleSaveList(recipe);
                                },
                              },
                            ]
                          )
                        }
                      >
                        <Ionicons name="close" size={22} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// // I will have lists based on recipes. So a single list is related to a single recipe
// // Extra feature = merging shopping lists from multiple recipes...1 tomate (recipe 1), 2 tomatoes (recipe 2) = 3 tomatoes total
// import {
//   ScrollView,
//   SafeAreaView,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   Alert,
// } from "react-native";
// import React, { useState } from "react";
// import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
// import { useShoppingLists } from "./ShoppingListsContext";
// const screenHeight = Dimensions.get("window").height;

// export function ShoppingLists({ navigation }) {
//   const { shoppingLists, toggleSaveList } = useShoppingLists();
//   const [input, setInput] = useState("");

//   const filteredRecipes = shoppingLists.filter((recipe) =>
//     recipe.title.toLowerCase().includes(input.toLowerCase())
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
//       <ScrollView>
//         <View style={[styles.section, { marginTop: screenHeight / 35 }]}>
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color="#656565" />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search lists"
//               value={input}
//               onChangeText={setInput}
//             />
//           </View>
//         </View>

//         {filteredRecipes.map((recipe, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() =>
//               navigation.navigate("ShoppingList", {
//                 recipeId: recipe.recipeId,
//               })
//             }
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 padding: 10,
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Image
//                 source={{ uri: recipe.image }}
//                 style={{
//                   width: 60,
//                   height: 60,
//                   borderRadius: 8,
//                   marginRight: 10,
//                 }}
//               />
//               <View style={{ flex: 1 }}>
//                 <Text style={{ fontSize: 14 }}>{recipe.title}</Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() =>
//                   Alert.alert(
//                     "Delete list",
//                     "Are you sure you want to delete this list?",
//                     [
//                       { text: "No", style: "cancel" },
//                       {
//                         text: "Yes",
//                         onPress: () => {
//                           toggleSaveList(recipe);
//                         },
//                       },
//                     ]
//                   )
//                 }
//               >
//                 <Ionicons name="close" size={22} color="black" />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
