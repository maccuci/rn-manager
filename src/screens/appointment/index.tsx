import Container from "@/atoms/container";
import Text from "@/atoms/text";
import { TouchableOpacity } from "@/atoms/touchable";
import FeatherIcon from "@/components/icon";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";

export default function AppointmentScreenTest() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <Container alignItems="center" justifyContent="center">
      <Text>Tela de consultas</Text>
      <TouchableOpacity onPress={handleBackPress} p="sm">
        <FeatherIcon name="arrow-left" size={24} />
      </TouchableOpacity>
    </Container>
  );
}
