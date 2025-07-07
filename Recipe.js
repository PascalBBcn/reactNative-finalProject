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

import styles from "./styles.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export function Recipe({ route, navigation }) {
  const { recipe, isSaved, onToggleSave } = route.params;
  const [isMetric, setIsMetric] = useState(false);
  const toggleSwitch = () => setIsMetric((previousState) => !previousState);

  const [saved, setSaved] = useState(isSaved);
  const handleToggleSave = () => {
    onToggleSave();
    setSaved((prev) => !prev);
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
              name={saved ? "heart" : "heart-outline"}
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
                onValueChange={toggleSwitch}
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
              const quantity = measure?.amount?.toFixed(1);

              return (
                <Text key={index} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: "bold" }}>• </Text>
                  <Text>
                    {quantity} {unit} {meta ? `${meta}, ` : ""}
                    {item.name}
                  </Text>
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTwoAlt}>Instructions</Text>
          <View style={styles.recipeInfoCard}>
            <RenderHTML
              contentWidth={screenWidth}
              source={{ html: recipe.instructions }}
              tagsStyles={{ li: { marginBottom: 4 } }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
