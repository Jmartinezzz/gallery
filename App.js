import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image as Img } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Home from "./screens/Home";
import Image from "./screens/Image";

const Stack = createNativeStackNavigator();

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          options={{
            headerLeft: () => (
              <Img
                style={styles.logo}
                source={{
                  uri: "https://seeklogo.com/images/P/pexels-logo-EFB9232709-seeklogo.com.png",
                }}
              />
            ),
            headerRight: () => (
              <Text
                style={{ color: "#FFF", fontSize: 18 }}
                onPress={() => setOpenSearch(!openSearch)}
              >
                {openSearch ? "Close" : "Search"}
              </Text>
            ),
            title: "Gallery APP",
            headerStyle: {
              backgroundColor: "#0D0D0D",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTintColor: "#FFFFFF",
          }}
        >
          {(props) => <Home {...props} openSearch={openSearch} />}
        </Stack.Screen>
        <Stack.Screen
          name="image"
          component={Image}
          options={{
            title: "Gallery APP",
            headerStyle: {
              backgroundColor: "#0D0D0D",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd: 5,
    borderRadius: 5,
  },
});
