import React from "react";
import { Text, View } from "react-native";
import { render, screen } from "@testing-library/react-native";

function BasicComponent() {
  return (
    <View>
      <Text>Hello World! Hello Jest!</Text>
    </View>
  );
}
function TextComponent({ children }) {
  return <Text>{children}</Text>;
}

describe("Basic Component Tests", () => {
  test("renders basic component correctly", () => {
    render(<BasicComponent />);
    expect(screen.getByText("Hello World! Hello Jest!")).toBeTruthy();
  });

  test("TextComponent matches snapshot", () => {
    const tree = render(<TextComponent>Saved</TextComponent>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
