import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cell,
  Section,
  Separator,
  TableView,
} from "react-native-tableview-simple";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

const screenWidth = Dimensions.get("window").width;
const imageHeight = Dimensions.get("window").height * 0.25;

const HomeScreenCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.cellContent}>
        <Image source={props.imgUri} style={styles.img} />
        <View style={styles.etaBadge}>
          <Text style={styles.etaText}>{props.eta} mins</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{props.score} ⭐</Text>
        </View>
        {props.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>🔥 Popular!</Text>
          </View>
        )}
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.tagline}>{props.tagline}</Text>
      </View>
    }
    height={290}
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    onPress={props.action}
  />
);

function Settings({ navigation }) {
  return <View></View>;
}
function Saved({ navigation }) {
  return <View></View>;
}
function ShoppingList({ navigation }) {
  return <View></View>;
}
function Search({ navigation }) {
  return <View></View>;
}
const repeatedScreenOptions = ({ navigation }) => ({
  headerTitleAlign: "center",
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      style={{ marginRight: 15 }}
    >
      <Ionicons name="settings-outline" size={24} color="#C34946" />
    </TouchableOpacity>
  ),
});
function Homescreen({ navigation }) {
  return (
    <ScrollView>
      <TableView>
        <Section header="" hideSeparator="true" separatorTintColor="#ccc">
          <HomeScreenCell
            title="Creamery Ice Cream Parlour"
            tagline="Desert, Ice cream, Cookies, £"
            eta="10-30"
            score="4.1"
            imgUri={require("./assets/iceCream.jpg")}
            action={() =>
              navigation.navigate("Menu", {
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
          <HomeScreenCell
            title="Cheezza Pizza"
            tagline="Pizza, Cheese, Garlic bread, ££"
            eta="35+"
            score="4.3"
            isPopular="true"
            imgUri={require("./assets/pizza.jpg")}
            action={() =>
              navigation.navigate("Menu", {
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
          <HomeScreenCell
            title="Butter Curry Chicken Story"
            tagline="Butter chicken, Naan, Samosa, £££"
            eta="20-35"
            score="4.5"
            imgUri={require("./assets/curry.jpg")}
            action={() =>
              navigation.navigate("Menu", {
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
          />
        </Section>
      </TableView>
    </ScrollView>
  );
}
function Menu({ route, navigation }) {
  // So we can add a quantity for each menu item
  const [quantities, setQuantities] = React.useState({});

  useEffect(() => {
    const defaultValue = {};
    route.params.items.forEach((section) => {
      section.contents.forEach((item) => {
        defaultValue[item.title] = 0;
      });
    });
    setQuantities(defaultValue);
  }, []);

  const updateValue = (itemTitle, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemTitle]: Math.max(0, (prev[itemTitle] || 0) + change),
    }));
  };

  return (
    <ScrollView>
      <TableView>
        {route.params.items.map((section, i) => (
          <Section
            key={i}
            header={section.title}
            headerTextStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              fontStyle: "italic",
              letterSpacing: 0.6,
            }}
          >
            {section.contents.map((cell, i) => (
              <Cell key={i} title={cell.title}>
                <View
                  style={{
                    position: "absolute",
                    right: imageHeight / 10,
                    alignItems: "center",
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => updateValue(cell.title, -1)}
                    style={{
                      padding: 10,
                      backgroundColor: "black",
                      opacity: 0.8,
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        color: "lightgreen",
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      minWidth: 20,
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    {quantities[cell.title] || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateValue(cell.title, 1)}
                    style={{
                      padding: 10,
                      backgroundColor: "lightgreen",
                      borderRadius: 100,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </Cell>
            ))}
          </Section>
        ))}
      </TableView>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen name="GetRecipes" component={Homescreen} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Saved Screen"
        component={Saved}
        options={{ title: "Saved" }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function ShoppingListStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Shopping List Screen"
        component={ShoppingList}
        options={{ title: "Shopping List" }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen
        name="Search Screen"
        component={Search}
        options={{ title: "Search" }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: imageHeight,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
  },
  cellContent: {
    position: "relative",
    width: screenWidth - 30,
    marginBottom: imageHeight / 10,
    backgroundColor: "rgba(173, 216, 230, 0.2)",
    borderRadius: 15,
  },
  etaBadge: {
    position: "absolute",
    right: imageHeight / 10,
    bottom: imageHeight - 165,
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
  etaText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  scoreBadge: {
    position: "absolute",
    right: imageHeight / 20,
    bottom: imageHeight,
    backgroundColor: "black",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  scoreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: imageHeight / 15,
  },
  popularBadge: {
    position: "absolute",
    right: imageHeight + 35,
    bottom: imageHeight / 3,
    backgroundColor: "rgba(255, 65, 20, 0.9)",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  popularText: {
    color: "white",
    fontWeight: "bold",
    fontSize: imageHeight / 15,
    letterSpacing: 0.7,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 14,
    color: "#888",
  },
});
