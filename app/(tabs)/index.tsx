import EmptySongsState from "@/components/EmptySongsState";
import SongList from "@/components/SongList";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../contexts/AppContext";


export default function Index() {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background }, // theme applied here
      ]}
    >
      {appContext?.dirUri ? <SongList /> : <EmptySongsState />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noFolderText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});