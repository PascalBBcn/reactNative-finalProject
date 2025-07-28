import React, { useState } from "react";
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
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //For the bottom navigation bar icons

const screenHeight = Dimensions.get("window").height;

import firebase from "./firebase";
import { myStyles } from "./styles";

export function RegisterLoginScreen({ navigation }) {
  const styles = myStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFormActive, setLoginFormActive] = useState(true);

  const authenticate = () => {
    if (!email || !password)
      return Alert.alert("Error logging in", "email and password required");
    if (loginFormActive) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.replace("Main"))
        .catch((e) => Alert.alert("Error logging in", e.message));
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.replace("Main"))
        .catch((e) => Alert.alert("Error registering", e.message));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <View style={{ marginTop: screenHeight / 10 }}>
          <Text
            style={{
              alignSelf: "center",
              color: "#C34946",
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            GetRecipes
          </Text>
          <Text style={styles.header}>
            {loginFormActive ? "Login" : "Register"}
          </Text>
          <View style={styles.section}>
            <View style={styles.searchBar}>
              <TextInput
                style={[styles.searchInput, { opacity: 0.6 }]}
                placeholder="Email"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.searchBar}>
              <TextInput
                style={[styles.searchInput, { opacity: 0.6 }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
          <View style={[styles.section, { alignItems: "center" }]}>
            <TouchableOpacity
              onPress={authenticate}
              style={styles.homescreenButton}
            >
              <Text style={{ fontWeight: "bold" }}>
                {loginFormActive ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.section,
                { alignItems: "center", marginTop: screenHeight / 20 },
              ]}
            >
              <TouchableOpacity
                onPress={() => setLoginFormActive(!loginFormActive)}
                style={[
                  styles.homescreenButton,
                  { height: screenHeight / 20, width: "70%" },
                ]}
              >
                {loginFormActive ? (
                  <Text>
                    New here?{" "}
                    <Text style={{ fontWeight: "bold" }}> Register</Text>
                  </Text>
                ) : (
                  <Text>
                    Welcome back!{" "}
                    <Text style={{ fontWeight: "bold" }}> Log in</Text>
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
