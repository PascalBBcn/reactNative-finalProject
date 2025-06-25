import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export function Saved({ navigation, savedRecipes }) {
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
              <Text style={{ fontSize: 16 }}>{recipe.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
