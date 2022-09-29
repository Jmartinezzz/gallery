import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getImages } from "../api/pexels";
import { Input, Button } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// components
import ImageList from "../components/ImageList";

export default function Home({ openSearch }) {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    setPhotos(res.data.photos);
  };
  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = () => {
    loadImages(searchTerm);
  };
  return (
    <>
      <KeyboardAwareScrollView>
        {openSearch && (
          <View style={styles.searchSection}>
            <Input
              leftIcon={{ type: "feather", name: "search", color: "#FFF" }}
              leftIconContainerStyle={styles.searchIcon}
              placeholder="Ingresa tu busqueda"
              inputContainerStyle={styles.searchInput}
              style={styles.input}
              onChangeText={(val) => setSearchTerm(val)}
            />
            <Button
              buttonStyle={styles.searchButton}
              title="Buscar"
              onPress={() => handleSearch()}
            />
          </View>
        )}

        <View style={styles.container}>
          <Text style={styles.totalResults}>Resultados</Text>
          <ImageList photos={photos} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResults: {
    color: "#d0d0d0",
    textAlign: "right",
    width: "100%",
    paddingTop: 20,
  },
  searchInput: {
    borderBottomWidth: 0,
    backgroundColor: "#2c2c2c",
    paddingHorizontal: 4,
  },
  input: {
    color: "#FFFFFF",
  },
  searchSection: {
    backgroundColor: "#0d0d0d",
    width: "100%",
    paddingLeft: 10,
    // flex: 1 / 8,
    paddingRight: 80,
    alignItems: "center",
    flexDirection: "row",
  },
  searchButton: {
    backgroundColor: "#229783",
    marginBottom: 27,
  },
  searchIcon: {
    paddingStart: 10,
    marginRight: 7,
  },
});
