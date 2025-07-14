import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { SavedRecipesProvider } from "./SavedRecipesContext.js";
import { SettingsProvider } from "./SettingsContext.js";

import Settings from "./Settings.js";
import { Homescreen } from "./Homescreen.js";
import styles from "./styles.js";
import { Search } from "./Search.js";
import { Saved } from "./Saved.js";
import { ShoppingList } from "./ShoppingList.js";
import { Recipe } from "./Recipe.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

const repeatedScreenOptions = ({ navigation }) => ({
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "#C34946",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      style={{ marginRight: 15 }}
    >
      <Ionicons name="settings-outline" size={24} color="#C34946" />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="GetRecipes"
        component={Homescreen}
        options={{
          title: "GetRecipes",
          headerStyle: { backgroundColor: "#f9f9f7" },
        }}
      />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}
function ShoppingListStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Shopping List Screen"
        component={ShoppingList}
        options={{
          title: "Shopping List",
          headerStyle: { backgroundColor: "#f9f9f7" },
        }}
      />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Saved Screen"
        component={Saved}
        options={{
          title: "Saved",
          headerStyle: { backgroundColor: "#f9f9f7" },
        }}
      />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Search Screen"
        component={Search}
        options={{
          title: "Search",
          headerStyle: { backgroundColor: "#f9f9f7" },
        }}
      />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Saved") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Shopping List") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: "#f9f9f7",
        },
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#C34946",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "bold" },
      })}
    >
      <Tab.Screen name="Saved" component={SavedStack} />
      <Tab.Screen name="Shopping List" component={ShoppingListStack} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
    </Tab.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <SavedRecipesProvider>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen
              name="Main"
              component={Tabs}
              options={{
                headerShown: false,
                headerStyle: { backgroundColor: "#f9f9f7" },
              }}
            />
            <MainStack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerStyle: { backgroundColor: "#f9f9f7" },
              }}
            />
          </MainStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </SavedRecipesProvider>
    </SettingsProvider>
  );
}
