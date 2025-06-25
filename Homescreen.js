import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

import styles from "./styles.js";

export function Homescreen({ navigation }) {
  const hotRecipes = [
    { id: "1", name: "Recipe Name 1" },
    { id: "2", name: "Recipe Name 2" },
    { id: "3", name: "Recipe Name 3" },
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  const cuisines = [
    "Italian",
    "Japanese",
    "Indian",
    "British",
    "Chinese",
    "Iranian",
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.header}>What would you like to cook?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#656565" />
            <TextInput
              style={styles.searchInput}
              placeholder="Ingredients, cuisine, dish, keyword"
            />
          </View>
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
              <TouchableOpacity key={meal} style={styles.homescreenButton}>
                <Text>{meal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTwo}>Browse by cuisine</Text>
          <View style={styles.grid}>
            {cuisines.map((cuisine) => (
              <TouchableOpacity key={cuisine} style={styles.homescreenButton}>
                <Text>{cuisine}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
