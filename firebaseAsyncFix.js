import { Platform } from "react-native";

// This code is necessary as Firebase v8 uses the old AsyncStorage:
// AsyncStorage from "react-native", which is deprecated and replaced by:
// AsyncStorage from "@react-native-async-storage/async-storage"
// This code "tricks" Firebase into using the new version

if (Platform.OS !== "web") {
  // Import the actual AsyncStorage from the new package
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;

  // Import the 'react-native' module
  const ReactNative = require("react-native");

  // Trick Firebase into using the new version of AsyncStorage
  Object.defineProperty(ReactNative, "AsyncStorage", {
    get() {
      return AsyncStorage;
    },
  });
}
