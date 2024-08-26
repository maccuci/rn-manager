import Container from "@/atoms/container";
import Text from "@/atoms/text";
import { HeaderBar } from "@/components/header";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeDrawerParamList, RootStackParamList } from "@/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";

export default function MobileMainScreen() {
  const navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  > = useNavigation();

  const handleSidebarToggle = useCallback(() => {
    navigation.toggleDrawer();
  }, []);

  return (
    <Container alignItems="center" justifyContent="center">
      <HeaderBar
        onSidebarToggle={handleSidebarToggle}
        isOpen={navigation.isFocused()}
      />
      <Text>Fala rapaziada</Text>
    </Container>
  );
}
