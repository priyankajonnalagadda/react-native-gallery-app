import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Image {
  id: string;
  download_url: string;
  author: string;
}

interface GalleryState {
  favorites: Image[];
  loadFavorites: () => void;
  toggleFavorite: (img: Image) => void;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    const data = await AsyncStorage.getItem("favorites");
    if (data) {
      set({ favorites: JSON.parse(data) });
    }
  },

  toggleFavorite: async (img) => {
    const exists = get().favorites.find((i) => i.id === img.id);

    let updated;

    if (exists) {
      updated = get().favorites.filter((i) => i.id !== img.id);
    } else {
      updated = [...get().favorites, img];
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },
}));