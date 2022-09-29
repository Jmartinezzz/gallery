import {
  StyleSheet,
  Text,
  View,
  Image as Img,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@rneui/base";
import { getImages } from "../api/pexels";

// from expo
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

// components
import ImageList from "../components/ImageList";

export default function Image({ route }) {
  const image = route.params;  
  const [photos, setPhotos] = useState([]);
  const loadImages = async () => {
    const res = await getImages(image.alt);
    setPhotos(res.data.photos);
  };
  useEffect(() => {
    loadImages();
  }, []);

  
  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url);
  };

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + ".jpg";
      const { uri } = await FileSystem.downloadAsync(image.src.large2x, fileUri);
      saveFile(uri);
    } catch (e) {
      console.log(e);
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Dowloads", asset, false);
    }
  };

  const handleDownload = () => {
    downloadFile();
  };

  return (
    <View style={styles.headerPhotographer}>
      <Img source={{ uri: image.src.large, height: 350 }} />
      <View
        style={{
          display: "flex",
          paddingVertical: 18,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: "red" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "#229783" }}
          onPress={handleDownload}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0d0d0d",
    flex: 1,
    padding: 12,
  },
  textPhotographer: {
    color: "#FFF",
    fontWeight: "bold",
    marginStart: 5,
    fontSize: 18,
  },
});
