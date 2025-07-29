import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Dimensions,
  Image,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import React, { useState } from "react";
import RenderHTML from "react-native-render-html";
import { useSettings, getFontSizeIncrement } from "./SettingsContext.js";
import { useSavedRecipes } from "./SavedRecipesContext.js";
import { useShoppingLists } from "./ShoppingListsContext.js";
import { myStyles } from "./styles";
import firebase from "./firebase";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export function Recipe({ route }) {
  // If user signed in as a guest, remove shopping list functionality
  const userIsGuest =
    firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous;

  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const { recipe } = route.params;
  const { savedRecipes, toggleSave } = useSavedRecipes();
  const { shoppingLists, toggleSaveList } = useShoppingLists();
  const { isMetric, toggleMeasurementSystem } = useSettings();

  const isSaved = savedRecipes.some((item) => item.title === recipe.title);
  const handleToggleSave = () => {
    toggleSave(recipe);
  };

  // Shopping list icon is slightly less obvious than heart, so give feedback message
  const isSavedList = shoppingLists.some((item) => item.recipeId === recipe.id);
  const handleToggleSaveList = () => {
    if (userIsGuest) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Please sign in to use shopping lists",
          ToastAndroid.SHORT
        );
      } else Alert.alert("Please sign in to use shopping lists");
      return;
    }

    toggleSaveList(recipe);
    const msg = isSavedList
      ? "Removed from shopping lists"
      : "Added to shopping lists";
    if (Platform.OS === "android") ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert(msg);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image source={{ uri: recipe.image }} style={styles.imgLarge} />
          <TouchableOpacity
            onPress={handleToggleSave}
            style={styles.heartContainerAlt}
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={30}
              color="#C34946"
              top="2"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.headerAlt}>{recipe.title}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginBottom: screenHeight / 20,
            }}
          >
            <View
              style={{
                position: "absolute",
                left: screenWidth / 11,
                alignItems: "center",
              }}
            >
              <Ionicons name="star" size={20} color="#FFB302" />
              <Text style={{ fontSize: 12 + fontSizeIncr }}>
                {recipe.spoonacularScore}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Ionicons name="people" size={20} color="#656565" />
              <Text style={{ fontSize: 12 + fontSizeIncr }}>
                {recipe.servings} servings
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                right: screenWidth / 11,
                alignItems: "center",
              }}
            >
              <Ionicons name="timer" size={20} color="#656565" />
              <Text style={{ fontSize: 12 + fontSizeIncr }}>
                {recipe.readyInMinutes} mins
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text style={[styles.headerTwoAlt]}>Ingredients</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Switch
                trackColor={{ false: "#ccc", true: "#888" }}
                thumbColor={isMetric ? "#C34946" : "#888"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleMeasurementSystem}
                value={isMetric}
              />
              <Text
                style={{
                  marginTop: -4,
                  fontSize: 12 + fontSizeIncr,
                  fontStyle: "italic",
                }}
              >
                {isMetric ? "metric" : "us    "}
              </Text>
            </View>
          </View>
          <View style={styles.recipeInfoCard}>
            <TouchableOpacity
              onPress={handleToggleSaveList}
              style={{ position: "absolute", top: 12, right: 12 }}
            >
              <Ionicons
                name={isSavedList ? "cart" : "cart-outline"}
                size={27}
                color="#C34946"
              />
            </TouchableOpacity>

            {recipe.ingredients.map((item, index) => {
              const measure = isMetric
                ? item.measures?.metric
                : item.measures?.us;
              const meta = item.meta?.join(", ");
              const unit = measure?.unitShort || "";
              const amount = measure?.amount;

              // Remove trailing 0's
              const quantity =
                amount % 1 === 0 ? amount.toString() : amount?.toFixed(1);

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20 + fontSizeIncr,
                      fontWeight: "bold",
                      width: 24,
                      lineHeight: 20,
                      marginRight: -5,
                      minHeight: 40,
                    }}
                  >
                    •
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14 + fontSizeIncr,
                        lineHeight: 20,
                        maxWidth: "90%",
                      }}
                    >
                      {quantity} {unit}
                      {meta ? `, ${meta}` : ""} {item.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTwoAlt}>Instructions</Text>
          <View style={styles.recipeInfoCard}>
            {recipe.instructions &&
              recipe.instructions[0]?.steps.map((step) => (
                <View
                  key={step.number}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    marginLeft: -13,
                  }}
                >
                  <View style={{ width: 30, alignItems: "flex-end" }}>
                    <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                      {step.number}.
                    </Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 14 + fontSizeIncr }}>
                    {step.step}
                  </Text>
                </View>
              ))}
            {/* {recipe.analyzedInstructions?.includes("<") ? (
              <RenderHTML
                contentWidth={screenWidth}
                source={{ html: recipe.analyzedInstructions }}
                tagsStyles={{ li: { marginBottom: 4 } }}
              />
            ) : (
              recipe.analyzedInstructions
                ?.split(/(?<=\.)\s+/)
                .filter(Boolean)
                .map((sentence, index) => (
                  <Text key={index} style={{ maginBottom: 10 }}>
                    {index + 1}. {sentence.trim()}
                  </Text>
                ))
            )} */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
