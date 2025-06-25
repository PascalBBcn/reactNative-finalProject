import { ScrollView, SafeAreaView, Switch, Dimensions } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5EE" }}>
      <ScrollView>
        <TableView>
          <Section
            header="Support"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Contact us"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
            <Cell
              title="Feedback"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
          <Section
            header="Account"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Log out"
              onPress={() => alert("Are you sure you want to log out?")}
            />
            <Cell
              title="Delete account"
              onPress={() =>
                alert("Are you sure you want to DELETE your account?")
              }
            />
          </Section>
          <Section
            header="About"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              title="Privacy policy"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
          <Section
            header="App"
            headerTextStyle={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Cell
              cellStyle="Basic"
              title="Light mode"
              cellAccessoryView={<Switch />}
              contentContainerStyle={{
                paddingVertical: 4,
                paddingRight: screenWidth / 20,
              }}
            />
            <Cell
              cellStyle="Basic"
              title="Dark mode"
              cellAccessoryView={<Switch />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />
            <Cell
              title="Font size"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() => alert("test!")}
            />
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}
