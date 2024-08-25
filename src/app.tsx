import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { useAtom } from "jotai";
import React from "react";
import { StatusBar } from "react-native";
import { activeThemeAtom } from "./states/theme";
import Navigation from "./navigation";

const RenderApp = () => {
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

export default RenderApp;
