import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const validateMobile = (num) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(num);
  };

  const onLogin = () => {
    if (!mobile.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter mobile number and password.");
      return;
    }

    if (!validateMobile(mobile)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    // Demo login logic
    if (mobile === "9999999999") {
      navigation.replace("CustomerHome", { user: mobile });
    } else if (mobile === "8888888888") {
      navigation.replace("WorkerHome", { user: mobile });
    } else {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <LinearGradient colors={["#2563eb", "#1e3a8a"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* App Title */}
        <Text style={styles.appTitle}>Sathi</Text>
        <Text style={styles.subTitle}>Your trusted service companion</Text>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            value={mobile}
            onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))} // only digits
            placeholder="Enter 10-digit mobile number"
            keyboardType="numeric"
            maxLength={10}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity onPress={onLogin} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New to Sathi? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#e0e7ff",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 18 },
  footerText: { color: "#374151", fontSize: 14 },
  link: { color: "#2563eb", fontWeight: "700", fontSize: 14 },
});
