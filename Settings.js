import {
  ScrollView,
  SafeAreaView,
  Switch,
  Dimensions,
  Alert,
  View,
  Text,
} from "react-native";
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
              onPress={() =>
                Alert.alert(
                  "Contact Us",
                  "For general enquiries, please email: support@fakeEmail.com",
                  [{ text: "Ok" }]
                )
              }
            />
            <Cell
              title="Feedback"
              cellStyle="Basic"
              accessory="DisclosureIndicator"
              accessoryColorDisclosureIndicator={"darkgray"}
              contentContainerStyle={{ paddingRight: screenWidth / 9 }}
              onPress={() =>
                Alert.alert(
                  "Feedback",
                  "We appreciate any feedback at: feedback@fakeEmail.com",
                  [{ text: "Ok" }]
                )
              }
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
              onPress={() =>
                Alert.alert("Log out", "Are you sure you want to log out?", [
                  { text: "No", style: "cancel" },
                  {
                    text: "Yes",
                    onPress: () => {
                      Alert.alert("Log out", "See you soon!", [
                        { text: "Close" },
                      ]);
                    },
                  },
                ])
              }
            />
            <Cell
              title="Delete account"
              onPress={() =>
                Alert.alert(
                  "Delete account",
                  "Are you sure you want to DELETE your account?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        Alert.alert(
                          "Delete account",
                          "This action is permanent.",
                          [{ text: "Close" }]
                        );
                      },
                    },
                  ]
                )
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
              onPress={() =>
                Alert.alert(
                  "Privacy policy",
                  "Would you like to view our privacy policy?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        Alert.alert(
                          "Privacy Policy",
                          "This app is a school project. At GetRecipes, we do not collect/share personal data. This message is for demo purposes only. This app is a school project. At GetRecipes, we do not collect/share personal data. This message is for demo purposes only.",
                          [{ text: "Close" }]
                        );
                      },
                    },
                  ]
                )
              }
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
        <View>
          <Text
            style={{
              alignSelf: "center",
              color: "#C34946",
              fontWeight: "bold",
              marginTop: 30,
              fontSize: 30,
            }}
          >
            GetRecipes
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 12,
            }}
          >
            v1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
