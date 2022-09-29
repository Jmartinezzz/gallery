import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CardImage({ image }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardImage}
      onPress={() => navigation.navigate("image", image)}
    >
      <Image
        style={{ height: 160, width: "100%" }}
        source={{
          uri:
            image.src.portrait ??
            "https://static.thenounproject.com/png/340719-200.png",
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "49.5%",
    margin: 4,
    justifyContent: "space-between",
    borderWidth: 0,
    backgroundColor: "#2C292C",
    borderRadius: 5,
  },
});
