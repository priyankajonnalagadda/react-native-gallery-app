import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useGalleryStore } from "../store/useGalleryStore";

export default function Home({ navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { favorites, toggleFavorite, loadFavorites } = useGalleryStore();

  // 🔄 Load favorites
  useEffect(() => {
    loadFavorites();
  }, []);

  // 📡 Fetch API
  const fetchImages = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      const json = await res.json();

      setData((prev) => [...prev, ...json]);
    } catch (err) {
      console.log("Error fetching images", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  // 🔍 Search filter
  const filteredData = data.filter((item) =>
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      
      {/* ⭐ NAVIGATION BUTTONS */}
      <Text
        onPress={() => navigation.navigate("Favorites")}
        style={{ color: "blue", fontSize: 18, marginBottom: 10 }}
      >
        ⭐ Go to Favorites
      </Text>

      <Text
        onPress={() => navigation.navigate("Profile")}
        style={{ color: "green", fontSize: 18, marginBottom: 10 }}
      >
        👤 Go to Profile
      </Text>

      {/* 🔍 SEARCH */}
      <TextInput
        placeholder="Search by author..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      {/* 📋 LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        renderItem={({ item }) => {
          const isFav = favorites.some((i) => i.id === item.id);

          return (
            <View style={{ marginBottom: 15 }}>
              
              {/* 🖼️ IMAGE (NAVIGATE TO DETAILS) */}
              <Image
                source={{ uri: item.download_url }}
                style={{ height: 200, borderRadius: 10 }}
                onTouchEnd={() =>
                  navigation.navigate("Details", { item })
                }
              />

              <Text>{item.author}</Text>
              <Text>ID: {item.id}</Text>

              {/* ❤️ FAVORITE BUTTON */}
              <Text
                onPress={() => toggleFavorite(item)}
                style={{
                  color: isFav ? "red" : "gray",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                {isFav ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}