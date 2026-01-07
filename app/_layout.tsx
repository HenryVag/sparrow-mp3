import { Stack } from "expo-router";
import AppContextProvider from "./contexts/AppContext";
import PlayerContextProvider from "./contexts/PlayerContext";

export default function RootLayout() {
  return (
  <AppContextProvider>
    <PlayerContextProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </PlayerContextProvider>
  </AppContextProvider>)
}
