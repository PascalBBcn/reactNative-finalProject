import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

import { myStyles } from "./styles";
import { useSettings, getFontSizeIncrement } from "./SettingsContext.js";
const screenHeight = Dimensions.get("window").height;
const apiKey = "90731595192b48b4806b672564913a73";
const screenWidth = Dimensions.get("window").width;

export function Homescreen({ navigation }) {
  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  console.log(styles);
  const [hotRecipes, setHotRecipes] = useState([]);

  useEffect(() => {
    getHotRecipes();
  }, []);

  const getHotRecipes = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&sort=popularity&number=1&apiKey=${apiKey}`;
      const res = await fetch(url);
      const recipes = await res.json();
      setHotRecipes(recipes.results);
      getDetailedInfo(recipes.results);
    } catch (error) {
      console.error("Error getting hot recipes", error);
    }
  };

  const getDetailedInfo = (recipes) => {
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
        }))
        .catch((error) => {
          console.log(error);
          return {
            ...recipe,
            spoonacularScore: null,
            readyInMinutes: null,
            servings: null,
            ingredients: [],
            instructions: "Error, instructions unavailable.",
          };
        });
    });
    Promise.all(details)
      .then((fullRecipes) => {
        setHotRecipes(fullRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Taken from the list of all "cuisine" searches available on Spoonacular
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  const cuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.header}>What would you like to cook?</Text>
          {/* Navigates to the search tab (not screen, as that requires variables) */}
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#656565" />
              <TextInput
                style={styles.searchInput}
                placeholder="Ingredients, cuisine, dish, keyword"
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.headerTwo}>Hot recipes now!</Text>
          <FlatList
            data={hotRecipes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.homescreenCard}
                onPress={() =>
                  navigation.navigate("Recipe", {
                    recipe: item,
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: screenWidth / 3,
                    height: screenHeight / 7,
                  }}
                />
                <View style={styles.homescreenCardTextBox}>
                  <Text style={styles.homescreenCardText} numberOfLines={4}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTwo}>Browse by meal</Text>
          <View style={styles.row}>
            {mealTypes.map((meal) => (
              <TouchableOpacity
                key={meal}
                onPress={() =>
                  navigation.navigate("Search", {
                    screen: "Search Screen",
                    params: { startingFilter: meal },
                  })
                }
                style={[
                  styles.homescreenButton,
                  { fontSize: 14 + fontSizeIncr },
                ]}
              >
                <Text>{meal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTwo}>Browse by cuisine</Text>
          <View style={styles.grid}>
            {cuisines.map((cuisine) => (
              <TouchableOpacity
                key={cuisine}
                onPress={() =>
                  navigation.navigate("Search", {
                    screen: "Search Screen",
                    params: { startingFilter: cuisine },
                  })
                }
                style={[
                  styles.homescreenButton,
                  {
                    height: screenHeight / 15,
                  },
                ]}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 12 + fontSizeIncr }}
                >
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
