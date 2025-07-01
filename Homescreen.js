import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

import styles from "./styles.js";
const screenHeight = Dimensions.get("window").height;

export function Homescreen({ navigation }) {
  const hotRecipes = [
    { id: "1", name: "Recipe Name 1" },
    { id: "2", name: "Recipe Name 2" },
    { id: "3", name: "Recipe Name 3" },
  ];

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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.homescreenCard}>
                <Text>{item.name}</Text>
              </View>
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
                style={styles.homescreenButton}
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
                <Text style={{ textAlign: "center", fontSize: 12 }}>
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
