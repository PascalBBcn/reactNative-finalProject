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
import { myStyles } from "../styles";
import {
  useSettings,
  getFontSizeIncrement,
} from "../contexts/SettingsContext.js";
import { getHotRecipes, getDetailedInfo } from "../api.js";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export function Homescreen({ navigation }) {
  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const [hotRecipes, setHotRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getHotRecipes(1);
        const fullRecipes = await getDetailedInfo(recipes);
        setHotRecipes(fullRecipes);
      } catch (e) {
        console.error("Error fetching recipes", e);
      }
    };
    fetchRecipes();
  }, []);

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
