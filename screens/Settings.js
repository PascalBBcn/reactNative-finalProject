import {
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "../firebase";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons
import { myStyles } from "../styles";

import {
  useSettings,
  getFontSizeIncrement,
} from "../contexts/SettingsContext.js";

export default function Settings({ navigation }) {
  const { isMetric, toggleMeasurementSystem, fontSize, updateFontSize } =
    useSettings();
  const fontSizeIncr = getFontSizeIncrement(fontSize);
  const styles = myStyles(fontSizeIncr);

  // For fontSize popup modal
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [confirmDeletePassword, setConfirmDeletePassword] = useState("");

  const changeFontSize = (size) => {
    updateFontSize(size);
    setSettingsModalVisible(false);
  };

  const fontSizeValues = ["Small", "Default", "Large"];

  // Custom "tableview" cell, as tableview does not work in Expo Snack
  const settingsCell = (label, onPress, accessory = null) => {
    let rightIcon = null;
    if (accessory) rightIcon = accessory;
    else if (onPress)
      rightIcon = <Ionicons name="chevron-forward" size={18} color="#888" />;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={styles.settingsItem}
      >
        <Text style={styles.settingsText}>{label}</Text>
        {rightIcon}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <Text style={styles.settingsHeader}>Support</Text>
        <View style={styles.settingsContainer}>
          {settingsCell("Contact us", () =>
            Alert.alert(
              "Contact Us",
              "For general enquiries, please email: support@fakeEmail.com",
              [{ text: "Ok" }]
            )
          )}
          {settingsCell("Feedback", () =>
            Alert.alert(
              "Feedback",
              "We appreciate any feedback at: feedback@fakeEmail.com",
              [{ text: "Ok" }]
            )
          )}
        </View>

        <Text style={styles.settingsHeader}>Account</Text>
        <View style={styles.settingsContainer}>
          {settingsCell("Log out", () =>
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
          )}
          {settingsCell("Delete account", () =>
            Alert.alert(
              "Delete account",
              "Are you sure you want to DELETE your account?",
              [
                { text: "No", style: "cancel" },
                {
                  text: "Yes",
                  onPress: async () => {
                    const user = firebase.auth().currentUser;
                    if (user) {
                      try {
                        await user.delete();
                        Alert.alert("Account successfully delete");
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "RegisterLoginScreen" }],
                        });
                      } catch (e) {
                        if (e.code === "auth/requires-recent-login") {
                          setConfirmDeleteModalVisible(true);
                        } else {
                          Alert.alert("Error deleting account", e.message);
                        }
                      }
                    }
                  },
                },
              ]
            )
          )}
        </View>

        <Text style={styles.settingsHeader}>About</Text>
        <View style={styles.settingsContainer}>
          {settingsCell("Privacy policy", () =>
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
          )}
        </View>

        <Text style={styles.settingsHeader}>App</Text>
        <View style={styles.settingsContainer}>
          {settingsCell(
            <Text>
              Metric system:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {isMetric ? "metric" : "us"}
              </Text>
            </Text>,
            null,
            <Switch
              value={isMetric}
              onValueChange={toggleMeasurementSystem}
              trackColor={{ false: "#ccc", true: "#888" }}
              thumbColor={isMetric ? "#C34946" : "#888"}
            />
          )}
          {settingsCell(
            "Font size",
            () => setSettingsModalVisible(true),
            true,
            <Text style={{ color: "#888" }}>{fontSize}</Text>
          )}
        </View>

        <View>
          <Text style={styles.settingsLogoLarge}>GetRecipes</Text>
          <Text style={styles.settingsLogoSmall}>
            v1.0{" "}
            <Text style={{ fontStyle: "italic" }}>
              - Powered by Spoonacular
            </Text>
          </Text>
        </View>

        <Modal visible={settingsModalVisible} transparent animationType="fade">
          <View style={styles.settingsModalContainer}>
            <View style={styles.settingsModalContent}>
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
        <Modal
          visible={confirmDeleteModalVisible}
          transparent
          animationType="fade"
        >
          <View style={styles.settingsModalContainer}>
            <View style={styles.settingsModalContent}>
              <TouchableOpacity
                onPress={() => setConfirmDeleteModalVisible(false)}
              >
                <Ionicons name="close" size={22} color="black" />
              </TouchableOpacity>
              <Text style={[styles.headerTwoAlt, { textAlign: "center" }]}>
                Re-enter your password
              </Text>
              <TextInput
                style={styles.searchInput}
                secureTextEntry
                placeholder="Password"
                value="confirmDeletePassword"
                onChangeText={setConfirmDeletePassword}
              ></TextInput>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
