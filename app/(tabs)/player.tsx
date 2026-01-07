import { NextPrevButton, PlayPauseButton } from "@/components/PlayerButton";
import { darkTheme, lightTheme } from "@/styles/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { PlayerContext } from "../contexts/PlayerContext";

export default function PlayerScreen() {
  const playerContext = useContext(PlayerContext);
  const appContext = useContext(AppContext);
  const buttonSize = 30

  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {playerContext?.currentSongName}
      </Text>

      <View style={styles.controls}>
        <NextPrevButton icon={<Ionicons name="play-skip-back-outline" color="#E53935" size={buttonSize} />} onPress={() => playerContext?.prev()} />
        <PlayPauseButton
          playIcon={<Ionicons name="play-outline" color="#E53935" size={buttonSize}/>}
          pauseIcon={<Ionicons name="pause-outline" color="#E53935" size={buttonSize}/>}
          onPress={() =>
            playerContext?.isPlaying
              ? playerContext?.pause()
              : playerContext?.play(
                  playerContext.currentSongURI,
                  playerContext.currentSongName
                )
          }
        />
        <NextPrevButton icon={<Ionicons name="play-skip-forward-outline" color="#E53935" size={buttonSize} />} onPress={() => playerContext?.next()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});