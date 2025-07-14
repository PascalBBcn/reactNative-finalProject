import React, { createContext, useContext, useState, useEffect } from "react";

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
