import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import React, { useState } from "react";
import RenderHTML from "react-native-render-html";
import { useSettings } from "./SettingsContext.js";
import { useSavedRecipes } from "./SavedRecipesContext.js";
import styles from "./styles.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export function Recipe({ route }) {
  const { recipe } = route.params;
  const { savedRecipes, toggleSave } = useSavedRecipes();
  const { isMetric, toggleMeasurementSystem } = useSettings();

  const isSaved = savedRecipes.some((item) => item.title === recipe.title);
  const handleToggleSave = () => {
    toggleSave(recipe);
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
              <Text style={{ fontSize: 12 }}>{recipe.spoonacularScore}</Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Ionicons name="people" size={20} color="#656565" />
              <Text style={{ fontSize: 12 }}>{recipe.servings} servings</Text>
            </View>

            <View
              style={{
                position: "absolute",
                right: screenWidth / 11,
                alignItems: "center",
              }}
            >
              <Ionicons name="timer" size={20} color="#656565" />
              <Text style={{ fontSize: 12 }}>{recipe.readyInMinutes} mins</Text>
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
                  fontSize: 12,
                  fontStyle: "italic",
                }}
              >
                {isMetric ? "metric" : "us    "}
              </Text>
            </View>
          </View>
          <View style={styles.recipeInfoCard}>
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
                      fontSize: 20,
                      fontWeight: "bold",
                      width: 24,
                      lineHeight: 20,
                      marginRight: -5,
                    }}
                  >
                    •
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ lineHeight: 20 }}>
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
                  <Text style={{ flex: 1 }}>{step.step}</Text>
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
