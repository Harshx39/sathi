              import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerHome({ route, navigation }) {
  return (
    <LinearGradient colors={["#fdfcfb", "#dfe9f3"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Customer 🙋</Text>
        <Text style={styles.sub}>Logged in as: {route?.params?.user}</Text>

        {/* Quick Info Section */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Active Bookings</Text>
          <Text style={styles.infoValue}>2</Text>
          <Text style={styles.infoLabel}>Total Spent</Text>
          <Text style={styles.infoValue}>₹3400</Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("BookService")}
          >
            <Ionicons name="hammer" size={22} color="#fff" />
            <Text style={styles.bottomBtnText}>Book</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("BookingHistory")}
          >
            <Ionicons name="time" size={22} color="#fff" />
            <Text style={styles.bottomBtnText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("CustomerProfile")}
          >
            <Ionicons name="person" size={22} color="#fff" />
            <Text style={styles.bottomBtnText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#111" },
  sub: { fontSize: 15, marginBottom: 20, color: "#555" },
  infoCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
    elevation: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  infoLabel: { fontSize: 16, color: "#1e3a8a" },
  infoValue: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#111" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBtn: { alignItems: "center" },
  bottomBtnText: { color: "white", fontSize: 12, marginTop: 4 },
});
