import CustomButton from "@/components/CustomButton";
import { darkTheme, lightTheme } from "@/styles/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { PlayerContext } from "../contexts/PlayerContext";

export default function SettingsScreen() {
  const appContext = useContext(AppContext);
  const playerContext = useContext(PlayerContext);

  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  async function pickSourceFolder() {
    try {
      const dir = await FileSystem.Directory.pickDirectoryAsync();
      if (dir) {
        playerContext?.reset();
        const decodedUri = decodeURIComponent(dir.uri);
        await AsyncStorage.setItem("dirUri", decodedUri);
        appContext?.setDirUri(decodedUri);
      }
    } catch {}
  }

  async function switchTheme() {
    const nextTheme = appContext?.theme === "dark" ? "light" : "dark";
    appContext?.setTheme(nextTheme);
    await AsyncStorage.setItem("theme", nextTheme);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <CustomButton label="Pick source folder" onPress={pickSourceFolder} />
      <CustomButton label="Switch Theme" onPress={switchTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});