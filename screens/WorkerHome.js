import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerHome({ route }) {
  const worker = route?.params?.user;

  // Dummy pending services
  const [pendingServices, setPendingServices] = useState([
    { id: "1", title: "Fix leaking pipe", customer: "Ramesh", status: "Pending" },
    { id: "2", title: "Install ceiling fan", customer: "Suresh", status: "Pending" },
  ]);

  const [completedServices, setCompletedServices] = useState([]);

  const completeService = (id) => {
    const job = pendingServices.find((s) => s.id === id);
    setPendingServices(pendingServices.filter((s) => s.id !== id));
    setCompletedServices([...completedServices, { ...job, status: "Completed" }]);
  };

  const handleWithdraw = () => {
    Alert.alert("Withdraw Request", "Your withdrawal request has been submitted!");
  };

  const renderService = ({ item }) => (
    <LinearGradient
      colors={item.status === "Pending" ? ["#fce7f3", "#fbcfe8"] : ["#d1fae5", "#a7f3d0"]}
      style={styles.card}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={item.status === "Pending" ? "time-outline" : "checkmark-done-outline"}
          size={28}
          color={item.status === "Pending" ? "#be185d" : "#065f46"}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardSub}>👤 {item.customer}</Text>
      <Text style={styles.cardStatus}>
        {item.status === "Pending" ? "⏳ Waiting for completion" : "✅ Completed"}
      </Text>
      {item.status === "Pending" && (
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={() => completeService(item.id)}
        >
          <Text style={styles.completeBtnText}>Mark as Done</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );

  // Stats Calculation
  const totalEarnings = completedServices.length * 500; // Assume ₹500 per service

  return (
    <LinearGradient colors={["#eef2ff", "#e0f2fe"]} style={styles.container}>
      <Text style={styles.text}>👷 Welcome Worker</Text>
      <Text style={styles.sub}>Logged in as: {worker}</Text>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={22} color="#be185d" />
          <Text style={styles.statNumber}>{pendingServices.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-done-outline" size={22} color="#065f46" />
          <Text style={styles.statNumber}>{completedServices.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cash-outline" size={22} color="#166534" />
          <Text style={styles.statNumber}>₹{totalEarnings}</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
      </View>

      {/* Pending Services */}
      <Text style={styles.sectionTitle}>🕑 Pending Services</Text>
      <FlatList
        data={pendingServices}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        ListEmptyComponent={<Text style={styles.empty}>🎉 No pending services</Text>}
      />

      {/* Completed Services */}
      <Text style={styles.sectionTitle}>✅ Completed Services</Text>
      <FlatList
        data={completedServices}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        ListEmptyComponent={<Text style={styles.empty}>No completed services yet</Text>}
      />

      {/* Withdraw Button */}
      <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
        <LinearGradient colors={["#22c55e", "#16a34a"]} style={styles.withdrawGradient}>
          <Ionicons name="cash-outline" size={22} color="white" />
          <Text style={styles.withdrawText}>Withdraw Earnings</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
    color: "#1e3a8a",
  },
  sub: { fontSize: 15, marginBottom: 20, textAlign: "center", color: "#555" },

  // Stats Section
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: { fontSize: 18, fontWeight: "800", color: "#111", marginTop: 4 },
  statLabel: { fontSize: 13, color: "#555" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#1f2937",
  },
  card: {
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSub: { fontSize: 14, color: "#374151", marginTop: 4 },
  cardStatus: { fontSize: 13, color: "#6b7280", marginTop: 6 },
  completeBtn: {
    backgroundColor: "#be185d",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  completeBtnText: { color: "white", fontWeight: "600" },
  empty: { textAlign: "center", color: "#777", marginVertical: 8 },
  withdrawBtn: { marginTop: 20 },
  withdrawGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
  },
  withdrawText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});
