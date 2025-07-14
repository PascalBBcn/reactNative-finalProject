import React, { createContext, useContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isMetric, setIsMetric] = useState(false);
  const toggleMeasurementSystem = () =>
    setIsMetric((previousState) => !previousState);

  return (
    <SettingsContext.Provider value={{ isMetric, toggleMeasurementSystem }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
