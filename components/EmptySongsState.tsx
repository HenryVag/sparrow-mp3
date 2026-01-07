import { AppContext } from "@/app/contexts/AppContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useContext, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EmptySongsState() {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  const girlAnim = useRef(new Animated.Value(0)).current;
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(girlAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(girlAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Girl animation */}
      <Animated.Image
        source={require("@/assets/illustrations/listening-music.png")}
        style={[
          styles.girlImage,
          { transform: [{ translateY: girlAnim }] },
        ]}
        resizeMode="contain"
      />

      {/* Arrow pinned bottom-right */}
      <Animated.Image
        source={require("@/assets/illustrations/arrow.png")}
        style={[
          styles.arrowImage,
          { transform: [{ translateY: arrowAnim }] },
        ]}
        resizeMode="contain"
      />

      <Text style={[styles.text, { color: theme.text }]}>
        Please pick a folder in Settings
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  girlImage: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  arrowImage: {
    position: "absolute",
    right: 50,
    bottom: 20,
    width: 60,
    height: 60,
    opacity: 0.85,
  },

  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.85,
  },
});