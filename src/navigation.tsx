import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useResponsiveLayout from "./hooks/useResponsiveLayout";
import MainScreen from "./screens/main";
import useDrawerEnabled from "./hooks/useDrawerEnabled";
import Sidebar from "./components/sidebar";
import AppointmentScreenTest from "./screens/appointment";
import SettingsScreen from "./screens/settings";
import { useAppointments } from "./hooks/useAppointments";
import { useEffect } from "react";

export type HomeDrawerParamList = {
  Main: {};
  Appointment: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

function Home() {
  const { isTablet } = useResponsiveLayout();
  const swipeEnabled = useDrawerEnabled();

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: isTablet ? "front" : "back",
        drawerStyle: {
          width: isTablet ? 280 : "90%",
        },
        swipeEdgeWidth: 200,
        swipeEnabled: swipeEnabled,
      }}
      drawerContent={Sidebar}
    >
      <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Appointment"
        component={AppointmentScreenTest}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
