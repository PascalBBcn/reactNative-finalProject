// Basic safe mocks for things you use in App.js
jest.mock("expo-status-bar", () => ({ StatusBar: () => null }));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

// AsyncStorage mock (stable and official)
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// If a library causes trouble later, you can mock it here similarly.
// Example (only if needed):
// jest.mock('@react-navigation/native', () => {
//   const actual = jest.requireActual('@react-navigation/native');
//   return { ...actual, useNavigation: () => ({ navigate: jest.fn() }) };
// });
