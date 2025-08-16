import { render, act } from "@testing-library/react-native";
import Settings from "../screens/Settings";

// Mock navigation
const mockNav = { reset: jest.fn() };

// Mock Ionicons
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

// Mock Firebase
jest.mock("../firebase", () => ({
  auth: () => ({
    signOut: jest.fn().mockResolvedValue(),
    currentUser: { delete: jest.fn().mockResolvedValue() },
  }),
}));

// Mock Context file, as only UI matters for snapshot tests
jest.mock("../contexts/SettingsContext.js", () => ({
  useSettings: () => ({
    isMetric: true,
    toggleMeasurementSystem: jest.fn(),
    fontSize: "Default",
    updateFontSize: jest.fn(),
  }),
  getFontSizeIncrement: () => 0,
}));

describe("Settings screen snapshot", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Settings navigation={mockNav} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
