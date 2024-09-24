import React, { useCallback, useState } from "react";
import { ScrollView, Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@shopify/restyle";
import DateTimePicker from "@react-native-community/datetimepicker";

import Container from "@/atoms/container";
import Text from "@/atoms/text";
import { TouchableOpacity } from "@/atoms/touchable";
import FeatherIcon from "@/components/icon";
import { RootStackParamList } from "@/navigation";
import Box from "@/atoms/box";
import TextInput from "@/atoms/text-input";
import { Appointment, useAppointments } from "@/hooks/useAppointments";

export default function AppointmentScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { appointments, addAppointment, loadAppointments, deleteAppointment } =
    useAppointments();
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>(
    {
      date: "",
      appointmentType: "",
      patient: "",
      reason: "",
    }
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const theme = useTheme();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateAppointment = () => {
    if (Object.values(newAppointment).some((value) => value.trim() === "")) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    addAppointment(newAppointment);
    setNewAppointment({
      date: "",
      appointmentType: "",
      patient: "",
      reason: "",
    });

    Alert.alert("Consultas", "A consulta foi adicionada com sucesso.");
    loadAppointments();
  };

  const handleInputChange = (
    field: keyof Omit<Appointment, "id">,
    value: string
  ) => {
    setNewAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteAppointment = (id: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta consulta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => deleteAppointment(id),
          style: "destructive",
        },
      ]
    );
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const localDate = new Date(selectedDate);
      localDate.setHours(localDate.getHours() + localDate.getTimezoneOffset() / 60);
  
      setShowDatePicker(false);
      setNewAppointment((prev) => ({
        ...prev,
        date: localDate.toISOString().split("T")[0],
      }));
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <Container flex={1} backgroundColor="$primary">
      <Box flexDirection="row" alignItems="center" padding="md">
        <TouchableOpacity onPress={handleBackPress}>
          <FeatherIcon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text variant="navbar" ml="md">
          Consultas
        </Text>
      </Box>

      <ScrollView>
        <Box padding="md">
          <Text variant="navbar" mb="md">
            Nova Consulta
          </Text>
          <TouchableOpacity onPress={showDatePickerHandler}>
            <TextInput
              placeholder="Data"
              color="black"
              backgroundColor="white"
              value={
                newAppointment.date
                  ? new Date(newAppointment.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""
              }
              editable={false}
              p="sm"
              borderRadius="md"
              mb="sm"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(newAppointment.date || Date.now())}
              mode="date"
              onChange={onDateChange}
            />
          )}
          <Text>Tipo de Consulta</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
              marginTop: 6,
            }}
          >
            <TouchableOpacity
              onPress={() => handleInputChange("appointmentType", "plano")}
              style={{
                backgroundColor:
                  newAppointment.appointmentType === "plano"
                    ? "black"
                    : "white",
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginRight: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    newAppointment.appointmentType === "plano"
                      ? "white"
                      : "black",
                }}
              >
                Plano
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange("appointmentType", "particular")}
              style={{
                backgroundColor:
                  newAppointment.appointmentType === "particular"
                    ? "black"
                    : "white",
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginLeft: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    newAppointment.appointmentType === "particular"
                      ? "white"
                      : "black",
                }}
              >
                Particular
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Nome do Paciente"
            backgroundColor="white"
            value={newAppointment.patient}
            onChangeText={(value) => handleInputChange("patient", value)}
            p="sm"
            borderRadius="md"
            mb="sm"
          />
          <TextInput
            placeholder="Motivo da Consulta"
            backgroundColor="white"
            value={newAppointment.reason}
            onChangeText={(value) => handleInputChange("reason", value)}
            p="sm"
            borderRadius="md"
            mb="sm"
          />
          <TouchableOpacity
            onPress={handleCreateAppointment}
            backgroundColor="$primary"
            p="md"
            borderRadius="md"
            mb="sm"
            mt="md"
          >
            <Text textAlign="center">Criar Consulta</Text>
          </TouchableOpacity>

          <Text variant="navbar" mt="lg" mb="md">
            Consultas Agendadas
          </Text>
          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              backgroundColor="white"
              p="md"
              borderRadius="md"
              mb="sm"
            >
              <Text variant="sidebar" color="black">
                {`Data: ${new Date(appointment.date).toLocaleDateString(
                  "pt-BR",
                  { day: "numeric", month: "long", year: "numeric" }
                )}`}
              </Text>
              <Text variant="sidebar" color="black">
                {`Tipo de consulta: ${appointment.appointmentType}`}
              </Text>
              <Text variant="sidebar" color="black">
                {`Paciente: ${appointment.patient}`}
              </Text>
              <Text variant="sidebar" color="black">
                {`Motivo: ${appointment.reason}`}
              </Text>
              <TouchableOpacity
                onPress={() => handleDeleteAppointment(appointment.id)}
              >
                <Text
                  variant="sidebar"
                  color="red"
                  textAlign="center"
                  mt={"md"}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Container>
  );
}
