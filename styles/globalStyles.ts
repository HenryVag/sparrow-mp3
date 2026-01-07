import { StyleSheet } from "react-native";

export const createGlobalStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    text: {
      color: theme.text,
    },
    header: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
    },
  });