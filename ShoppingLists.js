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
import styles from "./styles";
const screenHeight = Dimensions.get("window").height;

export function ShoppingLists({ navigation }) {
  const { shoppingLists, toggleSaveList } = useShoppingLists();
  const [input, setInput] = useState("");

  const filteredRecipes = shoppingLists.filter((recipe) =>
    recipe.title.toLowerCase().includes(input.toLowerCase())
  );

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

        {filteredRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ShoppingList", {
                recipe,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
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
                <Text style={{ fontSize: 14 }}>{recipe.title}</Text>
              </View>
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
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
