import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import Box from "@/atoms/box";
import Text from "@/atoms/text";
import { TouchableOpacity } from "@/atoms/touchable";
import FeatherIcon from "./icon";

type RootDrawerParamList = {
  Appointment: undefined;
  Settings: undefined;
};

const Sidebar = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const goTo = useCallback(
    (screen: keyof RootDrawerParamList) => {
      if (navigation.navigate) {
        navigation.navigate(screen);
      } else {
        console.warn("Navigation method not available");
      }
    },
    [navigation]
  );

  return (
    <Box flex={1} bg="$sidebarBackground">
      <SafeAreaView>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="lg"
          paddingVertical="md"
          borderBottomColor="$sidebarSeparator"
          borderBottomWidth={1}
        >
          <Text variant="navbar" color="$sidebarForeground">
            Gerenciador de Consultório
          </Text>
          <TouchableOpacity
            onPress={() => {
              goTo("Settings");
            }}
          >
            <FeatherIcon name="settings" size={24} color="$sidebarForeground" />
          </TouchableOpacity>
        </Box>
      </SafeAreaView>

      <Box paddingVertical="md">
        <TouchableOpacity
          onPress={() => goTo("Appointment")}
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="lg"
          paddingVertical="sm"
          marginBottom="xs"
        >
          <FeatherIcon name="calendar" size={20} color="$sidebarForeground" />
          <Text variant="navbar" color="$sidebarForeground" marginLeft="sm">
            Consultas
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default Sidebar;
