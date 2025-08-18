import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const allServices = [
  { id: 1, name: "Plumber", icon: "water" },
  { id: 2, name: "Electrician", icon: "flash" },
  { id: 3, name: "Carpenter", icon: "construct" },
  { id: 4, name: "Painter", icon: "color-palette" },
  { id: 5, name: "Cleaner", icon: "broom" },
];

export default function CustomerHome({ route }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", "Plumber", "Electrician", "Carpenter", "Painter", "Cleaner"];

  const filteredServices = allServices.filter((s) => {
    const matchCategory = category === "all" || s.name === category;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.header}>
        <Text style={styles.greet}>Hi, {route?.params?.user || "Customer"} 👋</Text>
        <Text style={styles.sub}>What service do you need today?</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            placeholder="Search services..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories as chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.chip, category === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Services Grid */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <LinearGradient colors={["#ffffff40", "#ffffff10"]} style={styles.cardInner}>
              <Ionicons name={item.icon} size={40} color="#1c1a1aff" />
              <Text style={styles.cardText}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.actionText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="hammer" size={20} color="#fff" />
          <Text style={styles.actionText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.actionText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7" },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greet: { color: "white", fontSize: 20, fontWeight: "700" },
  sub: { color: "white", fontSize: 14, marginBottom: 16 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { flex: 1, marginLeft: 6, color: "#000" },
  chipScroll: { marginTop: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: { backgroundColor: "#fff" },
  chipText: { color: "#eee", fontSize: 14 },
  chipTextActive: { color: "#111827", fontWeight: "600" },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  cardInner: {
    padding: 24,
    alignItems: "center",
    borderRadius: 16,
    backdropFilter: "blur(20px)", // glass effect (works with expo-blur if needed)
  },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#160869ff" },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionBtn: { alignItems: "center" },
  actionText: { color: "#fff", fontSize: 12, marginTop: 4 },
});
