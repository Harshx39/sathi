import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function CustomerHome({ route, navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const user = route?.params?.user || "Customer";

  const stats = [
    { id: "1", label: "Active Bookings", value: "2", icon: "clipboard-list", color: "#3b82f6" },
    { id: "2", label: "Total Spent", value: "₹3400", icon: "wallet", color: "#22c55e" },
  ];

  const actions = [
    { id: "1", title: "Book Service", icon: "hammer", color: "#3b82f6", screen: "BookService" },
    { id: "2", title: "Booking History", icon: "history", color: "#f59e0b", screen: "BookingHistory" },
    { id: "3", title: "Profile", icon: "user", color: "#06b6d4", screen: "CustomerProfile" },
    { id: "4", title: "Support", icon: "headset", color: "#e11d48", screen: "CustomerSupport" },
  ];

  const activities = [
    { id: "1", title: "Booking Confirmed", desc: "Plumber service booked", time: "10 min ago", icon: "check-circle", color: "#22c55e" },
    { id: "2", title: "Payment Done", desc: "₹500 paid for cleaning", time: "2 hrs ago", icon: "credit-card", color: "#3b82f6" },
    { id: "3", title: "Booking Completed", desc: "Electrician service done", time: "Yesterday", icon: "tasks", color: "#f59e0b" },
  ];

  return (
    <LinearGradient colors={["#fdfcfb", "#dfe9f3"]} style={{ flex: 1 }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.brand}>
          <FontAwesome5 name="handshake" size={18} color="#f59e0b" /> Sathi
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

      {/* Body with FlatList */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            {/* Welcome */}
            <Text style={styles.title}>Welcome {user} 🙋</Text>
            <Text style={styles.sub}>Manage your bookings & services</Text>

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
                <TouchableOpacity onPress={() => navigation.navigate("BookingHistory")}>
                  <Text style={styles.link}>View All</Text>
                </TouchableOpacity>
              </View>
              {activities.map((act) => (
                <View key={act.id} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: act.color }]}>
                    <FontAwesome5 name={act.icon} size={16} color="#fff" />
                  </View>
                  <View style={{ marginLeft: 12 }}>
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

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("CustomerProfile")}>
          <Ionicons name="person" size={22} color="#666" />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("BookService")}>
          <Ionicons name="hammer" size={22} color="#666" />
          <Text>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("BookingHistory")}>
          <Ionicons name="time" size={22} color="#666" />
          <Text>History</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setLogoutVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLogoutVisible(false);
                  navigation.replace("Login");
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
  container: { flex: 1, paddingBottom: 60 },

  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  brand: { fontSize: 18, fontWeight: "bold", color: "#111" },

  // Dropdown
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

  // Welcome
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginTop: 20 },
  sub: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 20 },

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
  statLabel: { fontSize: 12, color: "#555" },

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
  modalText: { fontSize: 14, color: "#555", marginBottom: 15, textAlign: "center" },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  cancelBtn: { color: "#666", fontSize: 15 },
  logoutBtn: { color: "#e11d48", fontSize: 15, fontWeight: "bold" },
});
