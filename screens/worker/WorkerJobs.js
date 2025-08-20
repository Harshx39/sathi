import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const jobs = [
  { id: "1", title: "Plumbing Repair", status: "Pending", payment: "₹500" },
  { id: "2", title: "Electrical Fix", status: "Completed", payment: "₹800" },
  { id: "3", title: "Painting Work", status: "In Progress", payment: "₹1200" },
];

export default function WorkerJobs() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛠️ Your Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>
              Status: <Text style={{ fontWeight: "600" }}>{item.status}</Text>
            </Text>
            <Text style={styles.payment}>Payment: {item.payment}</Text>
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
  title: { fontSize: 16, fontWeight: "600", color: "#1e3a8a" },
  status: { fontSize: 14, color: "#374151" },
  payment: { fontSize: 14, color: "#10b981", marginTop: 4 },
});
