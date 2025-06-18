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
  Switch,
  TextInput,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cell,
  Section,
  Separator,
  TableView,
} from "react-native-tableview-simple";
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { SavedRecipesContext } from "./SavedRecipesContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

const SearchScreenCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.cellContent}>
        <Image source={props.imgUri} style={styles.img} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.starContainer}>
            <Ionicons name="star" size={15} color="black" />
            <Ionicons name="star" size={15} color="black" />
            <Ionicons name="star" size={15} color="black" />
          </View>
          <View style={styles.timerContainer}>
            <Ionicons name="timer" size={15} color="#656565" />
            <Text style={styles.timerText}>{props.eta} mins</Text>
          </View>
          <Text style={styles.tagline}>{props.tagline}</Text>
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
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    onPress={props.action}
  />
);

function Settings({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <TableView>
          <Section
            header="Support"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Contact us"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
            <Cell
              title="Feedback"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
          <Section
            header="Account"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Log out"
              onPress={() => alert("Are you sure you want to log out?")}
            />
            <Cell
              title="Delete account"
              onPress={() =>
                alert("Are you sure you want to DELETE your account?")
              }
            />
          </Section>
          <Section
            header="About"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Privacy policy"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
          <Section
            header="App"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              cellStyle="Basic"
              title="Light mode"
              cellAccessoryView={<Switch />}
              contentContainerStyle={{
                paddingVertical: 4,
                paddingRight: screenWidth / 20,
              }}
            />
            <Cell
              cellStyle="Basic"
              title="Dark mode"
              cellAccessoryView={<Switch />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />
            <Cell
              title="Font size"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}
function Saved({ navigation }) {
  // const { savedRecipes } = useState([]);
  return (
    <SafeAreaView>
      <ScrollView>
        {/*  
        {savedItems.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: screenHeight / 20 }}>
            No saved recipes.
          </Text>
        ) : (
          savedItems.map((item, index) => (
            <View
              key={index}
              style={{ alignItems: "center", marginBottom: 30 }}
            >
              <Image
                source={item.imgUri}
                style={{
                  width: imageHeight,
                  height: imageHeight,
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </View>
          ))
        )}
      */}
      </ScrollView>
    </SafeAreaView>
  );
}
function ShoppingList({ navigation }) {
  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
}
function Search({ navigation }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const toggleSave = (title, imgUri) => {
    setSavedRecipes((prev) => {
      const exists = prev.find((item) => item.title === title);
      if (exists) return prev.filter((item) => item.title !== title);
      else return [...prev, { title, imgUri }];
    });
  };

  return (
    <SafeAreaView>
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
        <TableView>
          <Section header="" separatorInsetLeft="0" separatorTintColor="black">
            <SearchScreenCell
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
            />
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
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
// OG
// function Homescreen({ navigation }) {
//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <TableView>
//           <Section header="" hideSeparator="true" separatorTintColor="#ccc">
//             <HomeScreenCell
//               title="Creamery Ice Cream Parlour"
//               tagline="Desert, Ice cream, Cookies, £"
//               eta="10-30"
//               score="4.1"
//               imgUri={require("./assets/iceCream.jpg")}
//               action={() =>
//                 navigation.navigate("Menu", {
//                   items: [
//                     {
//                       title: "Gelato",
//                       contents: [
//                         { title: "Vanilla" },
//                         { title: "Pistachio 🔥" },
//                         { title: "Chocolate" },
//                       ],
//                     },
//                     {
//                       title: "Cookies",
//                       contents: [
//                         { title: "Chocolate Chip" },
//                         { title: "Macadamia White Chocolate" },
//                         { title: "Peanut Butter" },
//                         { title: "Shortbread" },
//                       ],
//                     },
//                   ],
//                 })
//               }
//             />
//             <HomeScreenCell
//               title="Cheezza Pizza"
//               tagline="Pizza, Cheese, Garlic bread, ££"
//               eta="35+"
//               score="4.3"
//               isPopular="true"
//               imgUri={require("./assets/pizza.jpg")}
//               action={() =>
//                 navigation.navigate("Menu", {
//                   items: [
//                     {
//                       title: "Cheezas",
//                       contents: [
//                         { title: "Cheeze" },
//                         { title: "Extra Cheeze" },
//                         { title: "Cheeza Supreme 🔥" },
//                       ],
//                     },
//                     {
//                       title: "Garlic Bread",
//                       contents: [
//                         { title: "Garlic" },
//                         { title: "Garlic Cheeze" },
//                         { title: "Garlic Extra Cheeze" },
//                         { title: "Garlic Cheeza Supreme" },
//                       ],
//                     },
//                   ],
//                 })
//               }
//             />
//             <HomeScreenCell
//               title="Butter Curry Chicken Story"
//               tagline="Butter chicken, Naan, Samosa, £££"
//               eta="20-35"
//               score="4.5"
//               imgUri={require("./assets/curry.jpg")}
//               action={() =>
//                 navigation.navigate("Menu", {
//                   items: [
//                     {
//                       title: "Main Dishes",
//                       contents: [
//                         { title: "Butter Chicken 🔥" },
//                         { title: "Dal Makhani" },
//                         { title: "Palak Paneer" },
//                         { title: "Chicken Biryani" },
//                       ],
//                     },
//                     {
//                       title: "Samosas",
//                       contents: [
//                         { title: "Chicken" },
//                         { title: "Veggie" },
//                         { title: "Lamb" },
//                       ],
//                     },
//                   ],
//                 })
//               }
//             />
//           </Section>
//         </TableView>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
// EXPERIMENTAL
function Homescreen({ navigation }) {
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
    <SafeAreaView>
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

function Recipe({ route, navigation }) {
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
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={repeatedScreenOptions}>
      <Stack.Screen name="GetRecipes" component={Homescreen} />
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
    // <SavedRecipesContext>
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitleAlign: "center",
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
    // </SavedRecipesContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // img: {
  //   width: "100%",
  //   height: imageHeight,
  //   borderRadius: 10,
  //   elevation: 4,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4.5,
  // },
  // cellContent: {
  //   position: "relative",
  //   width: screenWidth - 30,
  //   marginBottom: imageHeight / 10,
  //   backgroundColor: "rgba(173, 216, 230, 0.2)",
  //   borderRadius: 15,
  // },
  img: {
    width: imageHeight,
    height: imageHeight,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    alignSelf: "center",
  },
  cellContent: {
    borderRadius: 15,
    width: "100%",
    flexDirection: "row",
    height: imageHeight * 1.25,
    paddingRight: screenWidth / 25,
  },
  textContainer: {
    width: imageHeight / 1.1,
    borderColor: "black",
    marginTop: imageHeight / 6,
    marginLeft: screenWidth / 25,
    justifyContent: "flex-start",
  },
  starContainer: {
    flexDirection: "row",
  },
  timerContainer: {
    fontSize: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 12,
    color: "#888",
  },
  heartContainer: {
    justifyContent: "center",
  },
  // HOMESCREEN
  section: {
    marginBottom: screenHeight / 20,
    marginLeft: screenWidth / 25,
    marginRight: screenWidth / 25,
  },
  header: {
    marginTop: screenHeight / 25,
    marginBottom: screenHeight / 40,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingLeft: 15,
    height: 50,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  headerTwo: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 10,
    marginBottom: screenHeight / 35,
  },
  homescreenCard: {
    width: screenWidth / 3,
    height: screenHeight / 7,
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "flex-end",
    padding: 8,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  homescreenButton: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 100,
    alignItems: "center",
  },
});
