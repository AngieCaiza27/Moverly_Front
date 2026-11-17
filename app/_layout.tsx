import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />

      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="driver" />
      <Stack.Screen name="tracking" />
    </Stack>
  );
}
