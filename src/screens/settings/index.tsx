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
import { HomeDrawerParamList, RootStackParamList } from "@/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PDFGenerator from "@/components/generate-pdf";
import { useAppointments } from "@/hooks/useAppointments";
import { TouchableOpacity } from "@/atoms/touchable";
import FeatherIcon from "@/components/icon";
import Container from "@/atoms/container";

const StyledFlatList = createBox<Theme, FlatListProps<ThemeMeta>>(FlatList);

const SettingsScreen = () => {
  const navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  > = useNavigation();
  const [activeTheme, setActiveTheme] = useAtom(activeThemeId);
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
  }, [navigation]);

  return (
    <Container flex={1} backgroundColor="$background">
            <Box 
        flexDirection="row" 
        alignItems="center" 
        padding="lg"
        backgroundColor="$primary"
        shadowColor="$foreground"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={3}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <FeatherIcon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text variant="navbar" ml="md" color="white" fontSize={20}>
          Configurações
        </Text>
      </Box>

      <Box flex={1}>
        <StyledFlatList
          ListHeaderComponent={() => (
            <Box paddingHorizontal="lg" paddingVertical="md">
              <Text variant="title" color="$primary">
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
          <Text variant="title" color="$primary" mb="md">
            Data
          </Text>
          <Text variant="sidebar" color={activeTheme === "light" ? "black" : "white"} textAlign="center" mb="md">
            Clique no botão abaixo para exportar os dados das consultas para um
            PDF.
          </Text>
          <PDFGenerator appointments={appointments} />
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsScreen;
