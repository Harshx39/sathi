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
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";


export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
   const toast = useToast();
  const validateMobile = (num) => /^[0-9]{10}$/.test(num);

  const onLogin = () => {
    if (!mobile.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter mobile number and password.");
      return;
    }

    if (!validateMobile(mobile)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    if (mobile === "9999999999") {
      navigation.replace("CustomerHome", { user: mobile });
              toast.show("Login successful!", { type: 'success' });

    } else if (mobile === "8888888888") {
      navigation.replace("WorkerHome", { user: mobile });
              toast.show("Login successful!", { type: 'success' });

    } else {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <LinearGradient colors={["#f9fafb", "#e0f7fa"]}  style={styles.container}>

  <View style={styles.card}>
        {/* Brand */}
        <View style={styles.brandSection}>
          <FontAwesome5 name="handshake" size={50} color="#10b981" />
          <Text style={styles.brandTitle}>Sathi</Text>
          <Text style={styles.brandSubtitle}>Your trusted service companion</Text>
        </View>

        {/* Login Card */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Image
                source={{ uri: "https://flagcdn.com/w20/in.png" }}
                style={styles.flag}
              />
              <Text style={styles.code}>+91</Text>
            </View>
            <TextInput
              value={mobile}
              onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))}
              placeholder="Enter 10-digit mobile number"
              keyboardType="numeric"
              maxLength={10}
              style={styles.input}
            />
          </View>

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
   </View>
  
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 6 },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f3f4f6",
  },
  flag: { width: 20, height: 15, marginRight: 6 },
  code: { fontSize: 15, fontWeight: "600", color: "#333" },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: "#f9fafb",
  },
  primaryBtn: {
    backgroundColor: "#10b981",
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
  link: { color: "#3b82f6", fontWeight: "700", fontSize: 14 },
});
