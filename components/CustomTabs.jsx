import { LinearGradient } from "expo-linear-gradient";

export function CustomTabs(IconComponent, iconName, theme) {
  return {
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }) =>
      focused ? (
        <LinearGradient
          colors={[theme.primary, theme.secondary, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 32 }}
          className="justify-center items-center w-14 h-14"
        >
          <IconComponent name={iconName} size={32} color="white" />
        </LinearGradient>
      ) : (
        <IconComponent name={iconName} size={24} color={theme.text} />
      ),
  };
}
