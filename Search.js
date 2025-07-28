import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { myStyles } from "./styles";
import { useSavedRecipes } from "./SavedRecipesContext.js";
import { useSettings, getFontSizeIncrement } from "./SettingsContext.js";

// SPOONACULAR API KEY, FREE VERSION (MAX 150 QUERIES A DAY)
const apiKey = "90731595192b48b4806b672564913a73";

const screenWidth = Dimensions.get("window").width;

const SearchScreenCell = (props) => {
  const styles = props.styles;
  return (
    <Cell
      {...props}
      cellContentView={
        <View style={styles.cellContent}>
          <Image source={props.imgUri} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.iconContainer}>
              <Ionicons name="star" size={15} color="#FFB302" />
              <Text>{props.spoonacularScore}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={15} color="#656565" />
              <Text style={styles.tagline}>{props.servings} servings</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="timer" size={15} color="#656565" />
              <Text style={styles.timerText}>{props.readyInMinutes} mins</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={props.onToggleSave}
            style={styles.heartContainer}
          >
            <Ionicons
              name={props.isSaved ? "heart" : "heart-outline"}
              size={22}
              color="#C34946"
            />
          </TouchableOpacity>
        </View>
      }
      backgroundColor="#FFF5EE"
      highlightUnderlayColor="#ccc"
      onPress={props.action}
    />
  );
};

export function Search({ navigation, route }) {
  const dummyRecipe = {
    id: 1,
    title: "One-Pot Creamy Tomato Pasta with Basil",
    spoonacularScore: 88,
    servings: 2,
    readyInMinutes: 25,
    isSaved: false,
    imgUri: { uri: "https://via.placeholder.com/100x100.png?text=Pasta" },
  };
  const dummyRecipes = [dummyRecipe];

  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const { savedRecipes, toggleSave } = useSavedRecipes();
  const [input, setInput] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const [totalResults, setTotalResults] = useState(0);

  const startingFilter = route.params?.startingFilter;

  // For sort popup modal
  const [sortValue, setSortValue] = useState("popularity");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const sortValues = [
    { label: "Popularity", value: "popularity" },
    { label: "Time", value: "time" },
    { label: "Used Ingredients", value: "max-used-ingredients" },
  ];

  // HELP WITH API CALL LIMIT WORRY AND GRADERS ->
  // if you are worried about API call limit,
  // cache some queries as fallback to show as an example
  // ASYNC STORAGE

  // For setting up search filters
  useEffect(() => {
    const startingFilter = route.params?.startingFilter;
    if (startingFilter) setSearchFilters([startingFilter]);
  }, [route?.params?.startingFilter]);

  // For querying the API
  useEffect(() => {
    if (searchFilters.length > 0) {
      const query = searchFilters.join(" ");
      getRecipes(query);
    } else {
      setRecipes([]);
      setTotalResults(0);
    }
  }, [searchFilters]);

  const getRecipes = (query, sort = sortValue) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&sort=${sort}&number=1&apiKey=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setRecipes(json.results);
        setTotalResults(json.totalResults);

        getDetailedInfo(json.results);
      })
      .catch((error) => {
        console.log(error);
      });
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
        setRecipes(fullRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSearchFilter = () => {
    Keyboard.dismiss();
    if (input.trim() !== "") {
      setSearchFilters([...searchFilters, input.trim()]);
      setInput("");
    }
  };
  const removeSearchFilter = (searchFilterToRemove) => {
    setSearchFilters(searchFilters.filter((f) => f !== searchFilterToRemove));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF5EE", flex: 1 }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.header}>What would you like to cook?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#656565" />
            <TextInput
              style={styles.searchInput}
              placeholder="Ingredients, cuisine, dish, keyword"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={addSearchFilter}
            />
            <TouchableOpacity onPress={addSearchFilter}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {searchFilters.map((filter, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#ddd",
                borderRadius: 15,
                padding: 4,
                marginLeft: screenWidth / 25,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>{filter} </Text>
              <TouchableOpacity onPress={() => removeSearchFilter(filter)}>
                <Ionicons name="close" size={12} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: screenWidth / 25,
          }}
        >
          <Ionicons name="swap-vertical" size={20} color={"black"} />
          <Text style={{ marginLeft: 4, fontWeight: "bold" }}>
            {sortValue === "popularity"
              ? "Popularity"
              : sortValue === "time"
              ? "Time"
              : "Used Ingredients"}
          </Text>
        </TouchableOpacity>

        <Modal visible={sortModalVisible} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <View
              style={{
                backgroundColor: "#f9f9f7",
                padding: screenWidth / 25,
                marginLeft: screenWidth / 25,
                borderRadius: 20,
                width: screenWidth / 2.25,
              }}
            >
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <Ionicons name="close" size={22} color="black" />
              </TouchableOpacity>
              <Text style={[styles.headerTwoAlt, { alignSelf: "center" }]}>
                Sort by
              </Text>
              {sortValues.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => {
                    setSortValue(item.value);
                    setSortModalVisible(false);
                    if (searchFilters.length > 0) {
                      const query = searchFilters.join(" ");
                      getRecipes(query, item.value);
                    }
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 14 + fontSizeIncr }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Text
          style={{
            marginLeft: screenWidth / 25,
            fontSize: 12 + fontSizeIncr,
            alignSelf: "center",
          }}
        >
          {totalResults} results
        </Text>

        <TableView style={{ backgroundColor: "#FFF5EE" }}>
          <Section header="" separatorInsetLeft="0" separatorTintColor="black">
            {recipes.map((recipe) => (
              <SearchScreenCell
                key={recipe.id}
                title={recipe.title}
                imgUri={{ uri: recipe.image }}
                spoonacularScore={recipe.spoonacularScore}
                readyInMinutes={recipe.readyInMinutes}
                servings={recipe.servings}
                isSaved={
                  savedRecipes.find((i) => i.title === recipe.title)
                    ? true
                    : false
                }
                onToggleSave={() => toggleSave(recipe)}
                action={() =>
                  navigation.navigate("Recipe", {
                    recipe,
                  })
                }
                styles={styles}
              />
            ))}
            {/* DUMMY FOR ALLOWING DEVELOPMENT IF 0 API CALLS LEFT */}
            {/* {dummyRecipes.map((recipe) => (
              <SearchScreenCell
                key={recipe.id}
                imgUri={recipe.imgUri}
                title={recipe.title}
                spoonacularScore={recipe.spoonacularScore}
                servings={recipe.servings}
                readyInMinutes={recipe.readyInMinutes}
                isSaved={recipe.isSaved}
                onToggleSave={() => console.log("Toggled save for", recipe.id)}
                action={() => console.log("Pressed", recipe.id)}
                styles={styles}
              />
            ))} */}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}
