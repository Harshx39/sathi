import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function WorkerDetails({ navigation, route }) {
  const { firstName, lastName, mobile, email } = route.params;

  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");

  // Services Multi-select
  const [openServices, setOpenServices] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceItems, setServiceItems] = useState([
    { label: "Plumber", value: "plumber" },
    { label: "Electrician", value: "electrician" },
    { label: "Carpenter", value: "carpenter" },
    { label: "Painter", value: "painter" },
  ]);

  const handleNext = () => {
    if (!aadhar || !pan || services.length === 0) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    navigation.navigate("Payment", {
      firstName,
      lastName,
      mobile,
      email,
      aadhar,
      pan,
      services,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Aadhar Card Number"
        keyboardType="numeric"
        maxLength={12}
        value={aadhar}
        onChangeText={setAadhar}
      />

      <TextInput
        style={styles.input}
        placeholder="PAN Card Number"
        maxLength={10}
        value={pan}
        onChangeText={setPan}
      />

      <DropDownPicker
        multiple={true}
        min={0}
        max={5}
        open={openServices}
        value={services}
        items={serviceItems}
        setOpen={setOpenServices}
        setValue={setServices}
        setItems={setServiceItems}
        placeholder="Select Services"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
        <Text style={styles.primaryBtnText}>Next (Payment)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  dropdown: {
    borderColor: "#ccc",
    marginBottom: 12,
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  primaryBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  primaryBtnText: { color: "white", fontWeight: "600" },
});
