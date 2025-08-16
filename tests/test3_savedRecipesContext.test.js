import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity } from "react-native";
import {
  SavedRecipesProvider,
  useSavedRecipes,
} from "../contexts/SavedRecipesContext";

// Mock Firebase
jest.mock("../firebase", () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: (cb) => {
      // Simulate a user
      cb({ isAnonymous: true, uid: "guest123" });
      return jest.fn();
    },
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ docs: [] }),
        })),
        set: jest.fn(),
        delete: jest.fn(),
      })),
    })),
  })),
}));

const TestComponent = () => {
  const { savedRecipes, toggleSave } = useSavedRecipes();
  return (
    <>
      <Text testID="numOfSavedRecipes">{savedRecipes.length}</Text>
      <TouchableOpacity
        testID="saveRecipe"
        onPress={() => toggleSave({ id: 1, title: "Cheeseburger" })}
      />
    </>
  );
};

describe("SavedRecipesContext", () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue();
  });

  test("correctly toggles recipe save state for guest user (AsyncStorage)", async () => {
    const { getByTestId } = render(
      <SavedRecipesProvider>
        <TestComponent />
      </SavedRecipesProvider>
    );

    // Expects no saved recipes
    expect(getByTestId("numOfSavedRecipes").children[0]).toBe("0");

    // Save a recipe
    await act(async () => {
      fireEvent.press(getByTestId("saveRecipe"));
    });

    // Expects 1 saved recipe now
    await waitFor(() =>
      expect(getByTestId("numOfSavedRecipes").children[0]).toBe("1")
    );

    // Remove the saved recipe
    await act(async () => {
      fireEvent.press(getByTestId("saveRecipe"));
    });

    // Expects no saved recipes
    await waitFor(() =>
      expect(getByTestId("numOfSavedRecipes").children[0]).toBe("0")
    );
  });
});
