import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Role dropdown
  const [openRole, setOpenRole] = useState(false);
  const [role, setRole] = useState(null);
  const [roleItems, setRoleItems] = useState([
    { label: "Customer", value: "customer" },
    { label: "Worker", value: "worker" },
  ]);

  const validateForm = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !mobile.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirm.trim() ||
      !state.trim() ||
      !city.trim() ||
      !address.trim() ||
      !role
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return false;
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      Alert.alert("Error", "Mobile number must be 10 digits.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a valid email address.");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    return true;
  };

  const onRegister = () => {
    if (!validateForm()) return;

    if (role === "customer") {
      navigation.replace("CustomerHome", { user: mobile });
    } else {
      navigation.navigate("WorkerDetails", {
        firstName,
        lastName,
        mobile,
        email,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sathi - Register</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 6 }]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 6 }]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPass(!showPass)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPass ? "eye-off" : "eye"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={!showPass}
        value={confirm}
        onChangeText={setConfirm}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Role Dropdown */}
      <DropDownPicker
        open={openRole}
        value={role}
        items={roleItems}
        setOpen={setOpenRole}
        setValue={setRole}
        setItems={setRoleItems}
        placeholder="Select Role"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity onPress={onRegister} style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>
          {role === "worker" ? "Next" : "Create Account"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  eyeIcon: { position: "absolute", right: 12 },
  dropdown: {
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#d1d5db",
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#2563eb",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  primaryBtnText: { color: "white", fontWeight: "600", fontSize: 16 },
});
