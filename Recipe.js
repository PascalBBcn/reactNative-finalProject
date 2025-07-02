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
import styles from "./styles.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export function Recipe({ route, navigation }) {
  const { recipe } = route.params;
  const [isMetric, setIsMetric] = useState(false);
  const toggleSwitch = () => setIsMetric((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <Image source={{ uri: recipe.image }} style={styles.imgLarge} />
        <View style={styles.section}>
          <Text style={styles.headerAlt}>{recipe.title}</Text>

          <View
            style={[
              styles.starContainer,
              { justifyContent: "flex-start", gap: screenWidth / 15 },
            ]}
          >
            <View style={[styles.starContainer, { alignItems: "center" }]}>
              <Text>{recipe.spoonacularScore}</Text>
              <Ionicons name="star" size={15} color="black" />
            </View>

            <Text style={styles.tagline}>{recipe.servings} servings</Text>
            <View style={styles.timerContainer}>
              <Ionicons name="timer" size={15} color="#656565" />
              <Text style={styles.timerText}>{recipe.readyInMinutes} mins</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.headerTwoAlt}>Ingredients</Text>
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <Switch
                trackColor={{ false: "#ccc", true: "#888" }}
                thumbColor={isMetric ? "#C34946" : "#888"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isMetric}
              />
              <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                {isMetric ? "metric" : "us    "}
              </Text>
            </View>
          </View>

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
        <View style={styles.section}>
          <Text style={styles.headerTwoAlt}>Instructions</Text>
          <Text>{recipe.instructions}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
