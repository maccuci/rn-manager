import Box from "@/atoms/box";
import activeThemeId from "@/states/theme";
import { Theme, ThemeMeta, ThemeNames, themes } from "@/themes";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useNavigation } from "@react-navigation/native";
import { createBox } from "@shopify/restyle";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { FlatList, FlatListProps, SafeAreaView } from "react-native";
import ThemeListItem from "./theme-list-item";
import Text from "@/atoms/text";

const StyledFlatList = createBox<Theme, FlatListProps<ThemeMeta>>(FlatList);

const Sidebar = () => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  const [, setActiveTheme] = useAtom(activeThemeId);

  const handleThemeItemPress = useCallback(
    (selectedThemeId: ThemeNames) => {
      setActiveTheme(selectedThemeId);
    },
    [navigation]
  );

  const renderThemeItem = useCallback(
    ({ item }: { item: ThemeMeta }) => {
      return <ThemeListItem theme={item} onPress={handleThemeItemPress} />;
    },
    [handleThemeItemPress]
  );
  return (
    <Box flex={1} bg="$sidebarBackground">
      <SafeAreaView>
        <Box
          alignItems="flex-start"
          pl="md"
          pb="sm"
          mt="xs"
          borderBottomColor="$sidebarSeparator"
          borderBottomWidth={1}
        ></Box>
      </SafeAreaView>
      <StyledFlatList
        ListHeaderComponent={() => (
          <Box p="lg" alignItems="flex-start">
            <Text color="$sidebarForeground" fontWeight="bold">
              Temas
            </Text>
          </Box>
        )}
        data={themes}
        keyExtractor={(t: ThemeMeta) => t.id}
        renderItem={renderThemeItem}
      />
    </Box>
  );
};

export default Sidebar;
