import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

export function Saved({ navigation, savedRecipes, toggleSave }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        {savedRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
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
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: recipe.imgUri }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14 }}>{recipe.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleSave(recipe.title, recipe.imgUri)}
              >
                <Ionicons name="close" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
