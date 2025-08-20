import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerHome({ route, navigation }) {
  return (
    <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Worker 👷</Text>
        <Text style={styles.sub}>Logged in as: {route?.params?.user}</Text>

        {/* Stats Section */}
        <View style={styles.statsCard}>
          <Text style={styles.statLabel}>Pending Jobs</Text>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Earnings</Text>
          <Text style={styles.statValue}>₹1200</Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("WorkerJobs")}
          >
            <Ionicons name="time" size={22} color="#fff" />
            <Text style={styles.bottomBtnText}>Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("WorkerWithdraw")}
          >
            <Ionicons name="cash" size={22} color="#fff" />
            <Text style={styles.bottomBtnText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomBtn} 
            onPress={() => navigation.navigate("WorkerProfile")}
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
  statsCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
    elevation: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  statLabel: { fontSize: 16, color: "#92400e" },
  statValue: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#111" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f59e0b",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBtn: { alignItems: "center" },
  bottomBtnText: { color: "white", fontSize: 12, marginTop: 4 },
});
