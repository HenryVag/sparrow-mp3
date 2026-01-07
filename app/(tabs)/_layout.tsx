import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#e42222ff",
    tabBarInactiveTintColor: "#888888",
    tabBarStyle: {
      backgroundColor: "#000000ff",
      height: 60,
      paddingBottom: 6,
    },
    headerStyle: {
      backgroundColor: "#000000ff",
      height: 90,
    },
    headerTintColor: "#e42222ff",
    headerTitleAlign: "center",
    headerShadowVisible: false,

    //  HEADER TYPOGRAPHY 
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "600",
    },
  }}
>

      <Tabs.Screen
        name="index"
        options={{
          title: "Songs",
          headerTitle: "Songs",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "musical-notes-sharp" : "musical-notes-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}