import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useResponsiveLayout from "./hooks/useResponsiveLayout";
import MainScreen from "./screens";
import useDrawerEnabled from "./hooks/useDrawerEnabled";
import Sidebar from "./components/sidebar";

export type HomeDrawerParamList = {
  Main: {};
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
