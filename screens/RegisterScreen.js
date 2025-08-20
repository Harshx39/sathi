import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
      alert("Please fill all fields.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter a valid email.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
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
    <LinearGradient
      colors={["#e0f2fe", "#fef3c7"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
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
              color="#1e40af"
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 20,
    textAlign: "center",
  },
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  eyeIcon: { position: "absolute", right: 12 },
  dropdown: {
    borderColor: "#93c5fd",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  dropdownContainer: { borderColor: "#93c5fd" },
  primaryBtn: {
    backgroundColor: "#1e40af",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#1e40af",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  primaryBtnText: { color: "white", fontWeight: "700", fontSize: 16 },
});
