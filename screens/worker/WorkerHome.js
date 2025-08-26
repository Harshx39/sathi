import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function WorkerHome({ route, navigation }) {
  const [user] = useState(route?.params?.user || "Worker");
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const stats = [
    { id: "1", label: "Pending Jobs", value: "5", icon: "tasks", color: "#f59e0b" },
    { id: "2", label: "Completed Jobs", value: "12", icon: "check", color: "#22c55e" },
    { id: "3", label: "Earnings", value: "₹1200", icon: "rupee-sign", color: "#3b82f6" },
    { id: "4", label: "Rating", value: "4.8⭐", icon: "star", color: "#eab308" },
  ];

  const actions = [
    { id: "1", title: "My Jobs", icon: "briefcase", color: "#3b82f6", screen: "WorkerJobs" },
    { id: "2", title: "Withdraw", icon: "wallet", color: "#22c55e", screen: "WorkerWithdraw" },
    { id: "3", title: "Profile", icon: "user", color: "#f59e0b", screen: "WorkerProfile" },
    { id: "4", title: "Support", icon: "headset", color: "#06b6d4", screen: "WorkerSupport" },
  ];

  const activities = [
    { id: "1", title: "Job Completed", desc: "Plumbing at #123", time: "2h ago", icon: "check", color: "#22c55e" },
    { id: "2", title: "Payment Received", desc: "₹500 credited", time: "5h ago", icon: "rupee-sign", color: "#3b82f6" },
    { id: "3", title: "New Job Assigned", desc: "Cleaning work at #456", time: "1d ago", icon: "briefcase", color: "#f59e0b" },
  ];

  return (
    <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
      {/* ✅ Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.brand}>
          <FontAwesome5 name="qrcode" size={18} color="#f59e0b" /> Sathi
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* ✅ Dropdown Menu */}
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Settings");
            }}
          >
            <FontAwesome5 name="cog" size={16} />
            <Text style={styles.dropdownText}> Settings</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setMenuVisible(false);
              setLogoutVisible(true);
            }}
          >
            <FontAwesome5 name="sign-out-alt" size={16} />
            <Text style={styles.dropdownText}> Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ Body */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Welcome Worker 👷</Text>
            <Text style={styles.sub}>Logged in as: {user}</Text>

            {/* Stats */}
            <View style={styles.statsGrid}>
              {stats.map((s) => (
                <View key={s.id} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: s.color }]}>
                    <FontAwesome5 name={s.icon} size={18} color="#fff" />
                  </View>
                  <Text style={styles.statNumber}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {actions.map((a) => (
                <TouchableOpacity
                  key={a.id}
                  style={styles.actionCard}
                  onPress={() => navigation.navigate(a.screen)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: a.color }]}>
                    <FontAwesome5 name={a.icon} size={18} color="#fff" />
                  </View>
                  <Text style={styles.actionTitle}>{a.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Recent Activity</Text>
                <TouchableOpacity onPress={() => navigation.navigate("WorkerJobs")}>
                  <Text style={styles.link}>View All</Text>
                </TouchableOpacity>
              </View>
              {activities.map((act) => (
                <View key={act.id} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: act.color }]}>
                    <FontAwesome5 name={act.icon} size={14} color="#fff" />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.activityTitle}>{act.title}</Text>
                    <Text style={styles.activityDesc}>{act.desc}</Text>
                    <Text style={styles.activityTime}>{act.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        }
      />

      {/* ✅ Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("WorkerJobs")}>
          <Ionicons name="time" size={22} color="#666" />
          <Text>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("WorkerWithdraw")}>
          <Ionicons name="cash" size={22} color="#666" />
          <Text>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("WorkerProfile")}>
          <Ionicons name="person" size={22} color="#666" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Logout Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setLogoutVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLogoutVisible(false);
                  navigation.replace("Login"); // Back to Login
                }}
              >
                <Text style={styles.logoutBtn}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, paddingBottom: 60 },

  // ✅ Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  brand: { fontSize: 18, fontWeight: "bold", color: "#111" },

  dropdown: {
    position: "absolute",
    right: 10,
    top: 55,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    padding: 8,
    zIndex: 10,
  },
  dropdownItem: { flexDirection: "row", alignItems: "center", padding: 8 },
  dropdownText: { marginLeft: 6, fontSize: 14 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 4 },

  // Logout Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  modalActions: { flexDirection: "row", justifyContent: "space-around" },
  cancelBtn: { color: "#666", fontSize: 15 },
  logoutBtn: { color: "#e11d48", fontSize: 15, fontWeight: "bold" },

  // Header
  title: { fontSize: 22, fontWeight: "700", color: "#111", textAlign: "center", marginTop: 20 },
  sub: { fontSize: 15, color: "#555", textAlign: "center", marginBottom: 20 },

  // Stats
  statsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  statCard: {
    width: "45%",
    backgroundColor: "#fff",
    margin: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  statNumber: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "#555", textAlign: "center" },

  // Actions
  sectionTitle: { marginLeft: 8, marginTop: 14, fontSize: 14, fontWeight: "600", color: "#444" },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", margin: 8 },
  actionCard: {
    width: "45%",
    backgroundColor: "#fff",
    margin: 8,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  actionTitle: { fontSize: 13, fontWeight: "500" },

  // Recent Activity
  card: { backgroundColor: "#fff", margin: 10, borderRadius: 10, elevation: 2, padding: 12 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: "600" },
  link: { fontSize: 12, color: "#3b82f6" },
  activityItem: { flexDirection: "row", marginBottom: 10 },
  activityIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: { fontSize: 13, fontWeight: "600" },
  activityDesc: { fontSize: 12, color: "#555" },
  activityTime: { fontSize: 11, color: "#999" },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navItem: { alignItems: "center" },
});
