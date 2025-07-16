import React, { createContext, useContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isMetric, setIsMetric] = useState(false);
  const [fontSize, setFontSize] = useState("default");

  const toggleMeasurementSystem = () =>
    setIsMetric((previousState) => !previousState);

  const updateFontSize = (size) => setFontSize(size);

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
