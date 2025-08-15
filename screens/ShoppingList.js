import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { useShoppingLists } from "../contexts/ShoppingListsContext";
import { myStyles } from "../styles";
import {
  useSettings,
  getFontSizeIncrement,
} from "../contexts/SettingsContext.js";

export function ShoppingList({ route }) {
  const { fontSize } = useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);
  const { recipeId } = route.params;
  const { shoppingLists, toggleIngredient } = useShoppingLists();
  const recipe = shoppingLists.find((i) => i.recipeId === recipeId);
  const { isMetric, toggleMeasurementSystem } = useSettings();

  if (!recipe) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>This shopping list was deleted.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.headerAlt}>{recipe.title}</Text>
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
                    marginBottom: 10,
                    minHeight: 45,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleIngredient(recipeId, index)}
                    style={{ width: 24, marginRight: 5 }}
                  >
                    <Ionicons
                      name={item.checked ? "checkbox" : "square-outline"}
                      size={22}
                      color={"#C34946"}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={{ lineHeight: 20, maxWidth: "95%" }}>
                      {quantity} {unit}
                      {meta ? `, ${meta}` : ""} {item.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
