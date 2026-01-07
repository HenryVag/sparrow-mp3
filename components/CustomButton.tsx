import { AppContext } from "@/app/contexts/AppContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  label: string;
  onPress: () => void;
};

export default function CustomButton({ label, onPress }: CustomButtonProps) {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: theme.buttonBackground },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: theme.buttonText },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 220,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",

    // subtle elevation for Android
    elevation: 3,

    // subtle shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});