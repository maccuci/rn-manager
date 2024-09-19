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

  const handleSidebarToggle = useCallback(() => {
    navigation.toggleDrawer();
  }, []);

  return (
    <Container>
      <Box marginBottom={"xxl"}>
        <HeaderBar
          onSidebarToggle={handleSidebarToggle}
          isOpen={navigation.isFocused()}
        />
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
          <Text
            variant="navbar"
            color="$sidebarForeground"
            textAlign="center"
            mb={"md"}
          >
            Abaixo você pode gerar um PDF com os dados das consultas.
          </Text>
          <PDFGenerator appointments={appointments} />
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsScreen;
