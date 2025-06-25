import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useEffect } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export function Recipe({ route, navigation }) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
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
