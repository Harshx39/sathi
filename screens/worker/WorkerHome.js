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
    { id: "3", title: "Profile", icon: "user", color: "#f59e0b", screen: "Profile" },
    { id: "4", title: "Support", icon: "headset", color: "#06b6d4", screen: "WorkerSupport" },
  ];

  const activities = [
    { id: "1", title: "Job Completed", desc: "Plumbing at #123", time: "2h ago", icon: "check", color: "#22c55e" },
    { id: "2", title: "Payment Received", desc: "₹500 credited", time: "5h ago", icon: "rupee-sign", color: "#3b82f6" },
    { id: "3", title: "New Job Assigned", desc: "Cleaning work at #456", time: "1d ago", icon: "briefcase", color: "#f59e0b" },
  ];

  return (
    <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.brand}>
          <FontAwesome5 name="briefcase" size={18} color="#f59e0b" /> Sathi Worker
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
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

      {/* Main Body */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Welcome */}
            <View style={styles.welcomeCard}>
              <FontAwesome5 name="hand-paper" size={32} color="#f59e0b" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.welcomeTitle}>Welcome {user} 👷</Text>
                <Text style={styles.welcomeSubtitle}>Manage your jobs & earnings</Text>
              </View>
            </View>

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
          </>
        }
      />

      {/* Bottom Nav */}
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

      {/* Logout Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              <FontAwesome5 name="sign-out-alt" size={18} color="#f59e0b" /> Confirm Logout
            </Text>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setLogoutVisible(false)}>
                <Text style={{ color: "#333" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={() => {
                  setLogoutVisible(false);
                  navigation.replace("Login");
                }}
              >
                <Text style={{ color: "#fff" }}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
    zIndex: 1000,
  },
  brand: { fontSize: 18, fontWeight: "bold", color: "#333" },

  // Dropdown
  dropdown: {
    position: "absolute",
    top: 55,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 9999,
  },
  dropdownItem: { flexDirection: "row", alignItems: "center", padding: 6 },
  dropdownText: { marginLeft: 6, fontSize: 16, color: "#333" },
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 5 },

  // Welcome
  welcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    margin: 12,
    borderRadius: 10,
    elevation: 2,
  },
  welcomeTitle: { fontSize: 16, fontWeight: "600" },
  welcomeSubtitle: { fontSize: 13, color: "#666" },

  // Stats
  statsGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 },
  statCard: {
    width: "45%",
    backgroundColor: "#fff",
    margin: 8,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statNumber: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "#555", textAlign: "center" },

  // Actions
  sectionTitle: { marginLeft: 15, marginTop: 10, fontSize: 14, fontWeight: "bold", color: "#666" },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", margin: 10 },
  actionCard: {
    width: "45%",
    backgroundColor: "#fff",
    margin: 8,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  actionTitle: { fontSize: 13, fontWeight: "500", textAlign: "center" },

  // Recent Activity
  card: { backgroundColor: "#fff", margin: 12, borderRadius: 10, elevation: 2, padding: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: "600" },
  link: { fontSize: 12, color: "#3b82f6" },
  activityItem: { flexDirection: "row", marginBottom: 12 },
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

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 14, color: "#555", marginBottom: 15 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end" },
  btnCancel: { marginRight: 10, padding: 8 },
  btnLogout: { backgroundColor: "#f59e0b", padding: 8, borderRadius: 6 },
});
