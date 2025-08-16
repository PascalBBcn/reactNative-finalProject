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
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { myStyles } from "../styles";
import { useSavedRecipes } from "../contexts/SavedRecipesContext.js";
import {
  useSettings,
  getFontSizeIncrement,
} from "../contexts/SettingsContext.js";
import { getDetailedInfoByQuery } from "../api.js";

const screenWidth = Dimensions.get("window").width;

export const SearchScreenCell = (props) => {
  const styles = props.styles;
  return (
    <TouchableOpacity
      onPress={props.action}
      activeOpacity={0.5}
      style={{
        backgroundColor: "#fff5ee",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        padding: 10,
        borderRadius: 15,
      }}
    >
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
    </TouchableOpacity>
  );
};

export function Search({ navigation, route }) {
  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const { savedRecipes, toggleSave } = useSavedRecipes();
  const [input, setInput] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const startingFilter = route.params?.startingFilter;

  // For sort popup modal
  const [sortValue, setSortValue] = useState("popularity");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const sortValues = [
    { label: "Popularity", value: "popularity" },
    { label: "Time", value: "time" },
    { label: "Healthiness", value: "healthiness" },
    { label: "Used Ingredients", value: "max-used-ingredients" },
  ];
  const [sortDirection, setSortDirection] = useState("desc");

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
  }, [searchFilters, sortValue, sortDirection]);

  const getRecipes = async (query, append = false, newOffset = 0) => {
    try {
      const { fullRecipes, totalResults } = await getDetailedInfoByQuery(
        query,
        { number: 3, offset: newOffset, sort: sortValue, sortDirection }
      );
      setTotalResults(totalResults);
      setRecipes((prev) => (append ? [...prev, ...fullRecipes] : fullRecipes));
    } catch (e) {
      console.error("Error fetching recipes", e);
    }
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

  const loadMoreRecipes = () => {
    const newOffset = recipes.length;
    setOffset(newOffset);
    getRecipes(searchFilters.join(" "), true, newOffset);
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
              ? `Time (${sortDirection})`
              : sortValue === "healthiness"
              ? "Healthiness"
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
                    if (item.value === "time") {
                      setSortDirection((prev) =>
                        prev === "asc" ? "desc" : "asc"
                      );
                    } else setSortDirection("desc");

                    setSortModalVisible(false);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 14 + fontSizeIncr }}>
                    {item.label}
                    {item.value === "time" ? ` (${sortDirection})` : ""}
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

        {recipes.map((recipe) => (
          <SearchScreenCell
            key={recipe.id}
            title={recipe.title}
            imgUri={{ uri: recipe.image }}
            spoonacularScore={recipe.spoonacularScore}
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
            isSaved={
              savedRecipes.find((i) => i.title === recipe.title) ? true : false
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
        {recipes.length < totalResults && (
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              loadMoreRecipes();
            }}
          >
            <Text
              style={{
                fontSize: 14 + fontSizeIncr,
                alignSelf: "center",
              }}
            >
              Load more
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
