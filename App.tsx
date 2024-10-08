import Navigation from "@/navigation";
import { activeThemeAtom } from "@/states/theme";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { useAtom } from "jotai";
import React from "react";
import { StatusBar } from "react-native";

export default function App() {
  const [activeTheme] = useAtom(activeThemeAtom);

  return (
    <NavigationContainer>
      <ThemeProvider theme={activeTheme}>
        <StatusBar />
        <Navigation />
      </ThemeProvider>
    </NavigationContainer>
  );
};