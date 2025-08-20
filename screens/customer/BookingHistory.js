import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const bookings = [
  { id: "1", service: "Plumbing", date: "2025-08-01", cost: "₹600", status: "Completed" },
  { id: "2", service: "Cleaning", date: "2025-08-10", cost: "₹400", status: "Pending" },
  { id: "3", service: "Electrician", date: "2025-08-15", cost: "₹750", status: "Cancelled" },
];

export default function BookingHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📜 Booking History</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.service}</Text>
            <Text style={styles.detail}>Date: {item.date}</Text>
            <Text style={styles.detail}>Cost: {item.cost}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
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
  title: { fontSize: 16, fontWeight: "600", color: "#1d4ed8" },
  detail: { fontSize: 14, color: "#374151" },
  status: { fontSize: 14, fontWeight: "600", marginTop: 4, color: "#f59e0b" },
});
