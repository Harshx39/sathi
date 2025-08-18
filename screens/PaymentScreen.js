import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function PaymentScreen({ navigation, route }) {
  const handlePayment = () => {
    Alert.alert("Success", "Payment of ₹300 received!");
    navigation.replace("WorkerHome", { user: route.params.mobile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>₹300 / month subscription</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={handlePayment}>
        <Text style={styles.primaryBtnText}>Pay ₹300</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  primaryBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "600", fontSize: 16 },
});
