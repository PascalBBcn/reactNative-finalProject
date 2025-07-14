import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { useSavedRecipes } from "./SavedRecipesContext";
import styles from "./styles";
const screenHeight = Dimensions.get("window").height;

export function Saved({ navigation }) {
  const { savedRecipes, toggleSave } = useSavedRecipes();
  const [input, setInput] = useState("");

  const filteredRecipes = savedRecipes.filter((recipe) =>
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
              placeholder="Search recipes"
              value={input}
              onChangeText={setInput}
            />
          </View>
        </View>

        {filteredRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Recipe", {
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
              <TouchableOpacity onPress={() => toggleSave(recipe)}>
                <Ionicons name="close" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
