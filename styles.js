import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = Dimensions.get("window").height * 0.2;

const styles = StyleSheet.create({
  container: {},
  img: {
    width: imageHeight,
    height: imageHeight,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    alignSelf: "center",
  },
  imgLarge: {
    width: screenWidth,
    height: imageHeight * 2,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    alignSelf: "center",
  },
  cellContent: {
    borderRadius: 15,
    width: "100%",
    flexDirection: "row",
    height: imageHeight * 1.25,
    paddingRight: screenWidth / 25,
  },
  textContainer: {
    width: imageHeight / 1.1,
    borderColor: "black",
    marginTop: imageHeight / 6,
    marginLeft: screenWidth / 25,
    justifyContent: "flex-start",
  },
  starContainer: {
    flexDirection: "row",
  },
  timerContainer: {
    fontSize: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 12,
    color: "#888",
  },
  heartContainer: {
    justifyContent: "center",
  },
  // HOMESCREEN
  section: {
    marginBottom: screenHeight / 20,
    marginLeft: screenWidth / 25,
    marginRight: screenWidth / 25,
  },
  header: {
    marginTop: screenHeight / 25,
    marginBottom: screenHeight / 40,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 12,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0.75, height: 1 },
    textShadowRadius: 1,
    elevation: 3,
  },
  headerAlt: {
    marginTop: screenHeight / 40,
    marginBottom: screenHeight / 80,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 12,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0.75, height: 1 },
    textShadowRadius: 1,
    elevation: 3,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingLeft: 15,
    height: 50,
    marginBottom: -(screenHeight / 30),
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  headerTwo: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 10,
    marginBottom: screenHeight / 35,
  },
  headerTwoAlt: {
    fontWeight: "bold",
    alignSelf: "left",
    fontSize: 18,
    marginVertical: 10,
    marginBottom: screenHeight / 35,
  },
  homescreenCard: {
    width: screenWidth / 3,
    height: screenHeight / 7,
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "flex-end",
    padding: 8,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  homescreenButton: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: screenWidth / 3.7,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
