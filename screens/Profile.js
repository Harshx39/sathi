import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone] = useState("7572834489"); 
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  // Dropdown + Logout Modal
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    const profileData = {
      fullName,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      company,
      designation,
      bio,
      website,
      linkedin,
      twitter,
    };

    console.log("Profile Saved:", profileData);
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
         
        {/* Save + Dropdown Menu */}
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu placed outside header */}
      {menuVisible && (
        <View style={styles.dropdown}>
         <TouchableOpacity
         style={styles.dropdownItem}>
            <FontAwesome5 name="save" size={16} />
                 <Text style={styles.dropdownText}> Save</Text>
              </TouchableOpacity>
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


      {/* Scroll Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profile Picture */}
        <View style={styles.imageContainer}>
          <Image
            source={
              image ? { uri: image } : require("../assets/icon.png")
            }
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
            <FontAwesome name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { backgroundColor: "#eee" }]}
            value={phone}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDob}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        {/* Address Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Address Information</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Street Address"
            multiline
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="PIN Code"
            value={pincode}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(val) => setPincode(val.replace(/\D/g, ""))}
          />
        </View>

        {/* Professional Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Professional Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Company / Organization"
            value={company}
            onChangeText={setCompany}
          />
          <TextInput
            style={styles.input}
            placeholder="Designation"
            value={designation}
            onChangeText={setDesignation}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Bio / About"
            multiline
            maxLength={500}
            value={bio}
            onChangeText={setBio}
          />
          <Text style={styles.charCount}>{bio.length}/500</Text>
        </View>

        {/* Social Links */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Social Links</Text>
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
          />
          <TextInput
            style={styles.input}
            placeholder="LinkedIn"
            value={linkedin}
            onChangeText={setLinkedin}
          />
          <TextInput
            style={styles.input}
            placeholder="Twitter"
            value={twitter}
            onChangeText={setTwitter}
          />
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 16, marginBottom: 15 }}>
              Are you sure you want to logout?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ddd" }]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#f87171" }]}
                onPress={() => {
                  setLogoutVisible(false);
                  navigation.replace("Login");
                }}
              >
                <Text style={{ color: "#fff" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={22} color="#3b82f6" />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("QRCodes")}>
          <Ionicons name="qr-code" size={22} color="#666" />
          <Text>QR List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("History")}>
          <Ionicons name="time" size={22} color="#666" />
          <Text>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#333" },


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

  imageContainer: { alignItems: "center", marginVertical: 15 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  charCount: { alignSelf: "flex-end", fontSize: 12, color: "#666" },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalBtn: {
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },

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
