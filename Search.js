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
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import styles from "./styles.js";

// SPOONACULAR API KEY, FREE VERSION (MAX 150 QUERIES A DAY)
const apiKey = "90731595192b48b4806b672564913a73";

const screenWidth = Dimensions.get("window").width;

const SearchScreenCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.cellContent}>
        <Image source={props.imgUri} style={styles.img} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.starContainer}>
            <Text>{props.spoonacularScore}</Text>
          </View>
          <Text style={styles.tagline}>{props.servings} servings</Text>
          <View style={styles.timerContainer}>
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

export function Search({ navigation, savedRecipes, toggleSave }) {
  const [input, setInput] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    getRecipes("pizza");
  }, []);

  const getRecipes = (query) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=1&apiKey=${apiKey}`;
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
          spoonacularScore: info.spoonacularScore.toFixed(1),
          readyInMinutes: info.readyInMinutes,
          servings: info.servings,
        }))
        .catch((error) => {
          console.log(error);
          return {
            ...recipe,
            spoonacularScore: null,
            readyInMinutes: null,
            servings: null,
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
    <SafeAreaView style={{ backgroundColor: "#FFF5EE" }}>
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: screenWidth / 25,
          }}
        >
          <Ionicons name="swap-vertical" size={20} color={"black"} />
          <Text style={{ marginLeft: 4, fontWeight: "bold" }}>Popularity</Text>
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: screenWidth / 25,
            fontSize: 12,
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
                onToggleSave={() => toggleSave(recipe.title, recipe.image)}
              />
            ))}

            {/* HARDCODED DUMMY DATA */}
            {/* <SearchScreenCell
              title="Recipe 1 Recipe 1 Recipe 1"
              tagline="Desert, Ice cream, Cookies, £"
              eta="10-30"
              score="4.1"
              imgUri={require("./assets/iceCream.jpg")}
              isSaved={
                savedRecipes.find(
                  (i) => i.title === "Recipe 1 Recipe 1 Recipe 1"
                )
                  ? true
                  : false
              }
              onToggleSave={() =>
                toggleSave(
                  "Recipe 1 Recipe 1 Recipe 1",
                  require("./assets/iceCream.jpg")
                )
              }
              action={() =>
                navigation.navigate("Recipe", {
                  items: [
                    {
                      title: "Gelato",
                      contents: [
                        { title: "Vanilla" },
                        { title: "Pistachio 🔥" },
                        { title: "Chocolate" },
                      ],
                    },
                    {
                      title: "Cookies",
                      contents: [
                        { title: "Chocolate Chip" },
                        { title: "Macadamia White Chocolate" },
                        { title: "Peanut Butter" },
                        { title: "Shortbread" },
                      ],
                    },
                  ],
                })
              }
            />
            <SearchScreenCell
              title="Recipe 2"
              tagline="Pizza, Cheese, Garlic bread, ££"
              eta="35+"
              score="4.3"
              isPopular="true"
              imgUri={require("./assets/pizza.jpg")}
              action={() =>
                navigation.navigate("Recipe", {
                  items: [
                    {
                      title: "Cheezas",
                      contents: [
                        { title: "Cheeze" },
                        { title: "Extra Cheeze" },
                        { title: "Cheeza Supreme 🔥" },
                      ],
                    },
                    {
                      title: "Garlic Bread",
                      contents: [
                        { title: "Garlic" },
                        { title: "Garlic Cheeze" },
                        { title: "Garlic Extra Cheeze" },
                        { title: "Garlic Cheeza Supreme" },
                      ],
                    },
                  ],
                })
              }
            />
            <SearchScreenCell
              title="Recipe 3"
              tagline="Butter chicken, Naan, Samosa, £££"
              eta="20-35"
              score="4.5"
              imgUri={require("./assets/curry.jpg")}
              action={() =>
                navigation.navigate("Recipe", {
                  items: [
                    {
                      title: "Main Dishes",
                      contents: [
                        { title: "Butter Chicken 🔥" },
                        { title: "Dal Makhani" },
                        { title: "Palak Paneer" },
                        { title: "Chicken Biryani" },
                      ],
                    },
                    {
                      title: "Samosas",
                      contents: [
                        { title: "Chicken" },
                        { title: "Veggie" },
                        { title: "Lamb" },
                      ],
                    },
                  ],
                })
              }
            /> */}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}
