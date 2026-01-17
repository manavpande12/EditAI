import { Colors } from "@/assets/Colors";
import { CustomTabs } from "@/components/CustomTabs";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            borderRadius: 50,
            marginBottom: 54,
            marginHorizontal: 10,
            backgroundColor: theme.card + "99",
            height: 68,
            borderTopWidth: 1,
            borderTopColor: theme.border,
            position: "absolute",
            paddingTop: 12,
            overflow: "hidden",
          },
        ],
      }}
    >
      <Tabs.Screen name="home" options={CustomTabs(Feather, "home", theme)} />
      <Tabs.Screen
        name="swipe"
        options={CustomTabs(
          MaterialCommunityIcons,
          "view-dashboard-outline",
          theme
        )}
      />
      <Tabs.Screen
        name="create"
        options={CustomTabs(FontAwesome, "plus-square-o", theme)}
      />
      <Tabs.Screen
        name="leaderboard"
        options={CustomTabs(Ionicons, "trophy-outline", theme)}
      />
      <Tabs.Screen
        name="profile"
        options={CustomTabs(Feather, "user", theme)}
      />
    </Tabs>
  );
}
