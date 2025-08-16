import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react-native";
import { SettingsProvider, useSettings } from "../contexts/SettingsContext";
import { getFontSizeIncrement } from "../contexts/SettingsContext";

// TEST 1 - Test that the increments for font size are correct
test("getFontSizeIncrement returns correct values", () => {
  expect(getFontSizeIncrement("Small")).toBe(-4);
  expect(getFontSizeIncrement("default")).toBe(0);
  expect(getFontSizeIncrement("Large")).toBe(4);
  expect(getFontSizeIncrement("unknown")).toBe(0);
});

// Testing that the fontSize/measurementSystem are updated correctly from the Context Provider
function TestComponent() {
  const { isMetric, toggleMeasurementSystem, fontSize, updateFontSize } =
    useSettings();
  return (
    <>
      <TouchableOpacity onPress={toggleMeasurementSystem} testID="measurement">
        <Text>Measurement System</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => updateFontSize("Large")}
        testID="fontSize"
      >
        <Text>Font Size</Text>
      </TouchableOpacity>

      <Text testID="metric">{isMetric ? "metric" : "us"}</Text>
      <Text testID="size">{fontSize}</Text>
    </>
  );
}

// TEST 2
test("toggles measurement system correctly", async () => {
  render(
    <SettingsProvider>
      <TestComponent />
    </SettingsProvider>
  );

  // Initial value set to "us"
  expect(screen.getByTestId("metric").props.children).toBe("us");

  // Simulates user pressing of button
  await act(async () => {
    fireEvent.press(screen.getByTestId("measurement"));
  });

  await waitFor(() =>
    expect(screen.getByTestId("metric").props.children).toBe("metric")
  );
});

// TEST 3
test("updates font size correctly", async () => {
  render(
    <SettingsProvider>
      <TestComponent />
    </SettingsProvider>
  );
  await act(async () => {
    fireEvent.press(screen.getByTestId("fontSize"));
  });

  await waitFor(() =>
    expect(screen.getByTestId("size").props.children).toBe("Large")
  );
});
