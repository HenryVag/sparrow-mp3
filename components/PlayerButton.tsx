import { AppContext } from "@/app/contexts/AppContext";
import { PlayerContext } from "@/app/contexts/PlayerContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useContext, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type PlayerButtonProps = {
  playIcon: React.ReactNode ;
  pauseIcon: React.ReactNode;
  onPress?: () => void;
};

type NextPrevButtonProps = {
  icon: React.ReactNode;
  onPress?: () => void;
};

export function PlayPauseButton({
  playIcon,
  pauseIcon,
  onPress,
}: PlayerButtonProps) {
  const playerContext = useContext(PlayerContext);
  const appContext = useContext(AppContext);
  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.controlButton,
          {
            backgroundColor: theme.card,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.controlText, { color: theme.text }]}>
          {playerContext?.isPlaying ? pauseIcon : playIcon}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function NextPrevButton({ icon, onPress }: NextPrevButtonProps) {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.9,
          useNativeDriver: true,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }).start()
      }
    >
      <Animated.View
        style={[
          styles.controlButton,
          {
            backgroundColor: theme.card,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.controlText, { color: theme.text}]}>
          {icon}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  controlButton: {
    padding: 22,
    borderRadius: 20,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  controlText: {
    fontSize: 22,
  },
});