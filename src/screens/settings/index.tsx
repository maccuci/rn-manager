import Container from "@/atoms/container";
import React, { useCallback } from "react";
import { FlatList, FlatListProps } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { createBox, useTheme } from "@shopify/restyle";
import { useAtom } from "jotai";

import Box from "@/atoms/box";
import Text from "@/atoms/text";
import activeThemeId from "@/states/theme";
import { Theme, ThemeMeta, ThemeNames, themes } from "@/themes";
import ThemeListItem from "@/components/theme-list-item";
import { HeaderBar } from "@/components/header";
import { HomeDrawerParamList, RootStackParamList } from "@/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PDFGenerator from "@/components/generate-pdf";
import { useAppointments } from "@/hooks/useAppointments";
import { TouchableOpacity } from "@/atoms/touchable";
import FeatherIcon from "@/components/icon";

const StyledFlatList = createBox<Theme, FlatListProps<ThemeMeta>>(FlatList);

const SettingsScreen = () => {
  const navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  > = useNavigation();
  const [, setActiveTheme] = useAtom(activeThemeId);
  const theme = useTheme<Theme>();
  const { appointments } = useAppointments();

  const handleThemeItemPress = useCallback(
    (selectedThemeId: ThemeNames) => {
      setActiveTheme(selectedThemeId);
    },
    [setActiveTheme]
  );

  const renderThemeItem = useCallback(
    ({ item }: { item: ThemeMeta }) => {
      return <ThemeListItem theme={item} onPress={handleThemeItemPress} />;
    },
    [handleThemeItemPress]
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <Container>
      <Box marginBottom={"lg"}>
        <Box flexDirection="row" alignItems="center" padding="md">
          <TouchableOpacity onPress={handleBackPress}>
            <FeatherIcon name="arrow-left" size={24} color={"white"} />
          </TouchableOpacity>
          <Text variant="navbar" ml="md">
            Configurações
          </Text>
        </Box>
      </Box>
      <Box>
        <StyledFlatList
          ListHeaderComponent={() => (
            <Box paddingHorizontal="lg" paddingVertical="md">
              <Text variant="navbar" color="$sidebarForeground">
                Temas
              </Text>
            </Box>
          )}
          data={themes}
          keyExtractor={(t: ThemeMeta) => t.id}
          renderItem={renderThemeItem}
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        />
        <Box paddingHorizontal="lg" paddingVertical="md">
          <Text variant="navbar" color="$sidebarForeground" mb={"md"}>
            Data
          </Text>
          <Text
            variant="sidebar"
            color="$sidebarForeground"
            textAlign="center"
            mb={"md"}
          >
            Clique no botão abaixo para exportar os dados das consultas para um PDF.
          </Text>
          <PDFGenerator appointments={appointments} />
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsScreen;
