import React, { useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useGalleryStore } from "../store/useGalleryStore";

export default function Favorites() {
  const { favorites, loadFavorites, toggleFavorite } = useGalleryStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Favorite Images
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Image
              source={{ uri: item.download_url }}
              style={{ height: 200, borderRadius: 10 }}
            />

            <Text>{item.author}</Text>
            <Text>ID: {item.id}</Text>

            <Text
              onPress={() => toggleFavorite(item)}
              style={{ color: "red", marginTop: 5 }}
            >
              ❤️ Remove Favorite
            </Text>
          </View>
        )}
      />
    </View>
  );
}