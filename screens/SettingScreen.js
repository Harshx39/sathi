import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function SettingScreen() {  
  const navigation = useNavigation();

  // All app settings state
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    qrSecurity: true,
    qrExpiry: "30days",
    biometricLogin: false,
    pushNotifications: true,
    scanNotifications: true,
    emailNotifications: false,
    appLanguage: "en",
    appTheme: "light",
    soundEffects: true,
    vibration: true,
  });

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("appSettings");
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (err) {
        console.log("Load error", err);
      }
    })();
  }, []);

  // Save to storage
  const saveSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem("appSettings", JSON.stringify(newSettings));
      Alert.alert("✅ Success", "Settings saved successfully");
    } catch (err) {
      console.log("Save error", err);
    }
  };

  // Handler for toggles & pickers
  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    saveSettings(updated);
  };

  // Confirmation dialogs
  const confirmAction = (title, message, onConfirm) => {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", style: "destructive", onPress: onConfirm },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Settings</Text>
        <TouchableOpacity
          onPress={() =>
            confirmAction("Logout", "Are you sure you want to logout?", () =>
              navigation.replace("Login")
            )
          }
          style={styles.logoutBtn}
        >
          <Ionicons name="log-out-outline" size={20} color="#d33" />
          <Text style={{ color: "#d33", marginLeft: 5 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <Section title="Profile" icon="user">
          <Item
            title="Edit Profile"
            desc="Update your personal information"
            leftIcon="edit"
            onPress={() => navigation.navigate("Profile")}
          />
          <Item
            title="Change Phone Number"
            desc="Update your login phone number"
            leftIcon="key"
            onPress={() =>
              confirmAction(
                "Change Phone Number",
                "You will be logged out and need to verify your new number.",
                () => navigation.replace("Login")
              )
            }
          />
        </Section>

        {/* Security Section */}
        <Section title="Security & Privacy" icon="shield-alt">
          <Item title="Profile Visibility" desc="Control who can see your profile" leftIcon="eye">
            <Picker
              selectedValue={settings.profileVisibility}
              onValueChange={(v) => updateSetting("profileVisibility", v)}
              style={styles.picker}
            >
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Private" value="private" />
              <Picker.Item label="Contacts Only" value="contacts" />
            </Picker>
          </Item>
          <SwitchItem
            title="QR Code Security"
            desc="Require authentication for QR access"
            leftIcon="qrcode"
            value={settings.qrSecurity}
            onValueChange={(v) => updateSetting("qrSecurity", v)}
          />
          <Item title="Auto-expire QR Codes" desc="Set default expiration time" leftIcon="clock">
            <Picker
              selectedValue={settings.qrExpiry}
              onValueChange={(v) => updateSetting("qrExpiry", v)}
              style={styles.picker}
            >
              <Picker.Item label="Never" value="never" />
              <Picker.Item label="1 Day" value="1day" />
              <Picker.Item label="7 Days" value="7days" />
              <Picker.Item label="30 Days" value="30days" />
              <Picker.Item label="90 Days" value="90days" />
            </Picker>
          </Item>
          <SwitchItem
            title="Biometric Login"
            desc="Use fingerprint/face ID for login"
            leftIcon="fingerprint"
            value={settings.biometricLogin}
            onValueChange={(v) => updateSetting("biometricLogin", v)}
          />
        </Section>

        {/* Notifications Section */}
        <Section title="Notifications" icon="bell">
          <SwitchItem
            title="Push Notifications"
            desc="Receive notifications on your device"
            leftIcon="mobile-alt"
            value={settings.pushNotifications}
            onValueChange={(v) => updateSetting("pushNotifications", v)}
          />
          <SwitchItem
            title="Scan Notifications"
            desc="Get notified when your QR codes are scanned"
            leftIcon="qrcode"
            value={settings.scanNotifications}
            onValueChange={(v) => updateSetting("scanNotifications", v)}
          />
          <SwitchItem
            title="Email Notifications"
            desc="Weekly summary and important updates"
            leftIcon="envelope"
            value={settings.emailNotifications}
            onValueChange={(v) => updateSetting("emailNotifications", v)}
          />
        </Section>

        {/* Preferences Section */}
        <Section title="Preferences" icon="cog">
          <Item title="Language" desc="Choose your preferred language" leftIcon="language">
            <Picker
              selectedValue={settings.appLanguage}
              onValueChange={(v) => updateSetting("appLanguage", v)}
              style={styles.picker}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="हिंदी" value="hi" />
              <Picker.Item label="తెలుగు" value="te" />
              <Picker.Item label="தமிழ்" value="ta" />
              <Picker.Item label="বাংলা" value="bn" />
              <Picker.Item label="ગુજરાતી" value="gu" />
            </Picker>
          </Item>
          <Item title="Theme" desc="Choose app appearance" leftIcon="palette">
            <Picker
              selectedValue={settings.appTheme}
              onValueChange={(v) => updateSetting("appTheme", v)}
              style={styles.picker}
            >
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Dark" value="dark" />
              <Picker.Item label="Auto" value="auto" />
            </Picker>
          </Item>
          <SwitchItem
            title="Sound Effects"
            desc="Play sounds for interactions"
            leftIcon="volume-up"
            value={settings.soundEffects}
            onValueChange={(v) => updateSetting("soundEffects", v)}
          />
          <SwitchItem
            title="Vibration"
            desc="Vibrate on QR scan success"
            leftIcon="mobile-alt"
            value={settings.vibration}
            onValueChange={(v) => updateSetting("vibration", v)}
          />
        </Section>

        {/* Data & Storage Section */}
        <Section title="Data & Storage" icon="database">
          <Item
            title="Export Data"
            desc="Download your QR codes and history"
            leftIcon="download"
            onPress={() => Alert.alert("✅ Success", "Data exported successfully")}
          />
          <Item
            title="Clear Cache"
            desc="Free up storage space"
            leftIcon="broom"
            onPress={() =>
              confirmAction("Clear Cache", "This will clear temporary files.", () =>
                Alert.alert("✅ Success", "Cache cleared successfully")
              )
            }
          />
          <Item
            title="Delete Account"
            desc="Permanently delete your account"
            leftIcon="trash-alt"
            danger
            onPress={() =>
              confirmAction("Delete Account", "This cannot be undone!", () =>
                navigation.replace("Login")
              )
            }
          />
        </Section>

        {/* Support Section */}
        <Section title="Support" icon="life-ring">
          <Item
            title="Privacy Policy"
            desc="View privacy policy and data rights"
            leftIcon="shield-alt"
            onPress={() => navigation.navigate("Privacy")}
          />
          <Item
            title="Help Center"
            desc="Get answers to common questions"
            leftIcon="question-circle"
            onPress={() => Alert.alert("Help", "Opening Help Center...")}
          />
          <Item
            title="Contact Support"
            desc="Reach out for assistance"
            leftIcon="comments"
            onPress={() => Alert.alert("Support", "Contacting support...")}
          />
          <Item
            title="Rate & Review"
            desc="Share your experience"
            leftIcon="star"
            onPress={() => Alert.alert("Feedback", "Thank you for rating us!")}
          />
        </Section>

        {/* App Info */}
        <View style={styles.appInfo}>
          <FontAwesome5 name="qrcode" size={28} color="#3b82f6" />
          <Text style={styles.appTitle}>SecureQR App</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appVersion}>© 2025 QA App. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ----- REUSABLE COMPONENTS ----- */
const Section = ({ title, icon, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>
      <FontAwesome5 name={icon} size={14} /> {title}
    </Text>
    <View>{children}</View>
  </View>
);

const Item = ({ title, desc, leftIcon, onPress, danger, children }) => (
  <TouchableOpacity
    style={[styles.item, danger && { borderLeftColor: "#d33" }]}
    onPress={onPress}
    activeOpacity={onPress ? 0.6 : 1}
  >
    <View style={styles.itemLeft}>
      <FontAwesome5 name={leftIcon} size={18} color={danger ? "#d33" : "#3b82f6"} />
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.itemTitle, danger && { color: "#d33" }]}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
      </View>
    </View>
    {children ? children : <Ionicons name="chevron-forward" size={18} color="#999" />}
  </TouchableOpacity>
);

const SwitchItem = ({ title, desc, leftIcon, value, onValueChange }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <FontAwesome5 name={leftIcon} size={18} color="#3b82f6" />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
      </View>
    </View>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "space-between",
  },
  navBtn: { padding: 6 },
  navTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  logoutBtn: { flexDirection: "row", alignItems: "center" },

  content: { padding: 12 },

  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 6, color: "#444" },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: "500", color: "#333" },
  itemDesc: { fontSize: 12, color: "#777" },
  picker: { width: 120 },

  appInfo: { alignItems: "center", marginTop: 30, marginBottom: 40 },
  appTitle: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  appVersion: { fontSize: 12, color: "#888", marginTop: 2 },
});
