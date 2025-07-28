import {
  ScrollView,
  SafeAreaView,
  Switch,
  Dimensions,
  Alert,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import firebase from "./firebase";
import React, { useState } from "react";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { myStyles } from "./styles";

import { useSettings, getFontSizeIncrement } from "./SettingsContext.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export default function Settings({ navigation }) {
  const { isMetric, toggleMeasurementSystem, fontSize, updateFontSize } =
    useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);

  // For fontSize popup modal
  // const [sortValue, setSortValue] = useState("popularity");
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const changeFontSize = (size) => {
    updateFontSize(size);
    setSettingsModalVisible(false);
  };

  const fontSizeValues = ["Small", "Default", "Large"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
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
              onPress={() =>
                Alert.alert(
                  "Contact Us",
                  "For general enquiries, please email: support@fakeEmail.com",
                  [{ text: "Ok" }]
                )
              }
            />
            <Cell
              title="Feedback"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() =>
                Alert.alert(
                  "Feedback",
                  "We appreciate any feedback at: feedback@fakeEmail.com",
                  [{ text: "Ok" }]
                )
              }
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
              onPress={() =>
                Alert.alert("Log out", "Are you sure you want to log out?", [
                  { text: "No", style: "cancel" },
                  {
                    text: "Yes",
                    onPress: () => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          navigation.reset({
                            index: 0,
                            routes: [{ name: "RegisterLoginScreen" }],
                          });
                        })
                        .catch((e) => {
                          Alert.alert("Logout error", e.message);
                        });
                    },
                  },
                ])
              }
            />
            <Cell
              title="Delete account"
              onPress={() =>
                Alert.alert(
                  "Delete account",
                  "Are you sure you want to DELETE your account?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        Alert.alert(
                          "Delete account",
                          "This action is permanent.",
                          [{ text: "Close" }]
                        );
                      },
                    },
                  ]
                )
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
              onPress={() =>
                Alert.alert(
                  "Privacy policy",
                  "Would you like to view our privacy policy?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        Alert.alert(
                          "Privacy Policy",
                          "This app is a school project. At GetRecipes, we do not collect/share personal data. This message is for demo purposes only. This app is a school project. At GetRecipes, we do not collect/share personal data. This message is for demo purposes only.",
                          [{ text: "Close" }]
                        );
                      },
                    },
                  ]
                )
              }
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
              title={
                <Text>
                  Metric system:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {isMetric ? "metric" : "us"}
                  </Text>
                </Text>
              }
              cellAccessoryView={
                <Switch
                  value={isMetric}
                  onValueChange={toggleMeasurementSystem}
                  trackColor={{ false: "#ccc", true: "#888" }}
                  thumbColor={isMetric ? "#C34946" : "#888"}
                />
              }
              contentContainerStyle={{
                paddingVertical: 4,
                paddingRight: screenWidth / 20,
              }}
            />
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
              detail={fontSize}
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => setSettingsModalVisible(true)}
            />
          </Section>
        </TableView>
        <View>
          <Text
            style={{
              alignSelf: "center",
              color: "#C34946",
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 30,
            }}
          >
            GetRecipes
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 12,
            }}
          >
            v1.0
          </Text>
        </View>

        <Modal visible={settingsModalVisible} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <View
              style={{
                backgroundColor: "#f9f9f7",
                padding: screenWidth / 25,
                marginLeft: screenWidth / 25,
                borderRadius: 20,
                width: screenWidth / 2.25,
              }}
            >
              <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                <Ionicons name="close" size={22} color="black" />
              </TouchableOpacity>
              <Text style={[styles.headerTwoAlt, { textAlign: "center" }]}>
                Select Font Size
              </Text>
              {fontSizeValues.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => {
                    changeFontSize(size);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text
                    style={{
                      fontSize:
                        size === "Small" ? 12 : size === "Large" ? 20 : 16,
                      fontWeight: fontSize === size ? 900 : "normal",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
