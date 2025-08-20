import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const services = [
  { id: "1", name: "Plumbing", price: "₹500" },
  { id: "2", name: "Cleaning", price: "₹300" },
  { id: "3", name: "Electrician", price: "₹700" },
  { id: "4", name: "Carpentry", price: "₹900" },
];

export default function BookService() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔨 Available Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.bookBtn}>📅 Book Now</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#065f46" },
  price: { fontSize: 14, color: "#10b981" },
  bookBtn: { marginTop: 6, fontSize: 14, color: "#2563eb", fontWeight: "600" },
});
