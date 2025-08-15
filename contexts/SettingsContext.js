import React, { createContext, useContext, useEffect, useState } from "react";
// Used to store basic settings data locally, persists until uninstall
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isMetric, setIsMetric] = useState(false);
  const [fontSize, setFontSize] = useState("default");

  useEffect(() => {
    // Loading settings from local storage
    const getSettingsData = async () => {
      try {
        const measurementValue = await AsyncStorage.getItem("@isMetric");
        const fontSizeValue = await AsyncStorage.getItem("@fontSize");

        if (measurementValue !== null) setIsMetric(measurementValue === "true");
        if (fontSizeValue !== null) setFontSize(fontSizeValue);
      } catch (e) {
        console.error("Failed getting settings data: ", e);
      }
    };
    getSettingsData();
  }, []);

  // Toggle between metric/us measurement system (local persistence)
  const toggleMeasurementSystem = async () => {
    try {
      const updatedValue = !isMetric;
      setIsMetric(updatedValue);
      await AsyncStorage.setItem("@isMetric", updatedValue.toString());
    } catch (e) {
      console.error("Failed to save measurement value: ", e);
    }
  };
  // (local persistence)
  const updateFontSize = async (size) => {
    try {
      setFontSize(size);
      await AsyncStorage.setItem("@fontSize", size);
    } catch (e) {
      console.error("Failed to save font size: ", e);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ isMetric, toggleMeasurementSystem, fontSize, updateFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

export const getFontSizeIncrement = (fontSizeValue) => {
  switch (fontSizeValue) {
    case "Small":
      return -4;
    case "Large":
      return 4;
    default:
      return 0;
  }
};
