import { AppContext } from "@/app/contexts/AppContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type SongItemProps = {
  title: string;
  uri: string;
  onPress: () => void;
};

export default function SongItem({ title, uri, onPress }: SongItemProps) {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      style={[styles.songItem, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.songTitle, { color: theme.text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  songItem: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
});