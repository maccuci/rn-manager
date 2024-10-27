import React, { useCallback, useState } from "react";
import { ScrollView, Alert, Platform } from "react-native";
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { appointments, addAppointment, loadAppointments, deleteAppointment } = useAppointments();
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>({
    date: "",
    appointmentType: "",
    patient: "",
    reason: "",
  });
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

    Alert.alert("Sucesso", "A consulta foi adicionada com sucesso.");
    loadAppointments();
  };

  const handleInputChange = (field: keyof Omit<Appointment, "id">, value: string) => {
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
          Consultas
        </Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box padding="lg">
          <Box
            backgroundColor="$fieldInputBackground"
            padding="lg"
            borderRadius="sm"
            marginBottom="lg"
            shadowColor="$foreground"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={3}
          >
            <Text variant="navbar" color="$primary" fontSize={20} marginBottom="lg">
              Nova Consulta
            </Text>

            <Box marginBottom="md">
              <TouchableOpacity onPress={showDatePickerHandler}>
                <Box
                  backgroundColor="$fieldInputPlaceholderTextColor"
                  padding="md"
                  borderRadius="sm"
                  flexDirection="row"
                  alignItems="center"
                >
                  <FeatherIcon name="calendar" size={20} color={theme.colors.$primary} />
                  <TextInput
                    placeholder="Selecione a data"
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
                    flex={1}
                    marginLeft="sm"
                  />
                </Box>
              </TouchableOpacity>
            </Box>

            {showDatePicker && (
              <DateTimePicker
                value={new Date(newAppointment.date || Date.now())}
                mode="date"
                onChange={onDateChange}
              />
            )}

            <Text color="$primary" marginBottom="sm">Tipo de Consulta</Text>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="lg"
            >
              <TouchableOpacity
                onPress={() => handleInputChange("appointmentType", "plano")}
                style={{
                  backgroundColor: newAppointment.appointmentType === "plano" 
                    ? theme.colors.$primary 
                    : theme.colors.$fieldInputPlaceholderTextColor,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadii.sm,
                  flex: 1,
                  marginRight: theme.spacing.sm,
                }}
              >
                <Text
                  textAlign="center"
                  color={newAppointment.appointmentType === "plano" ? "white" : "$primary"}
                >
                  Plano
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange("appointmentType", "particular")}
                style={{
                  backgroundColor: newAppointment.appointmentType === "particular" 
                    ? theme.colors.$primary 
                    : theme.colors.$fieldInputPlaceholderTextColor,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadii.sm,
                  flex: 1,
                  marginLeft: theme.spacing.sm,
                }}
              >
                <Text
                  textAlign="center"
                  color={newAppointment.appointmentType === "particular" ? "white" : "$primary"}
                >
                  Particular
                </Text>
              </TouchableOpacity>
            </Box>

            <Box marginBottom="md">
              <Box
                backgroundColor="$fieldInputPlaceholderTextColor"
                padding="md"
                borderRadius="sm"
                flexDirection="row"
                alignItems="center"
                marginBottom="md"
              >
                <FeatherIcon name="user" size={20} color={theme.colors.$primary} />
                <TextInput
                  placeholder="Nome do Paciente"
                  value={newAppointment.patient}
                  onChangeText={(value) => handleInputChange("patient", value)}
                  flex={1}
                  marginLeft="sm"
                />
              </Box>

              <Box
                backgroundColor="$fieldInputPlaceholderTextColor"
                padding="md"
                borderRadius="sm"
                flexDirection="row"
                alignItems="center"
              >
                <FeatherIcon name="file" size={20} color={theme.colors.$primary} />
                <TextInput
                  placeholderTextColor={"$primary"}
                  placeholder="Motivo da Consulta"
                  value={newAppointment.reason}
                  onChangeText={(value) => handleInputChange("reason", value)}
                  flex={1}
                  marginLeft="sm"
                />
              </Box>
            </Box>

            <TouchableOpacity
              onPress={handleCreateAppointment}
              style={{
                backgroundColor: theme.colors.$primary,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadii.sm,
                marginTop: theme.spacing.lg,
              }}
            >
              <Text color="white" textAlign="center" fontSize={16}>
                Criar Consulta
              </Text>
            </TouchableOpacity>
          </Box>

          <Text variant="navbar" color="$primary" fontSize={20} marginBottom="md">
            Consultas Agendadas
          </Text>

          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              backgroundColor="$fieldInputBackground"
              padding="lg"
              borderRadius="sm"
              marginBottom="md"
              shadowColor="$foreground"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              <Box flexDirection="row" alignItems="center" marginBottom="sm">
                <FeatherIcon name="calendar" size={18} color={theme.colors.$primary} />
                <Text marginLeft="sm" color="$foreground">
                  {new Date(appointment.date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" marginBottom="sm">
                <FeatherIcon name="clock" size={18} color={theme.colors.$primary} />
                <Text marginLeft="sm" color="$foreground">
                  {appointment.appointmentType === "plano" ? "Plano" : "Particular"}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" marginBottom="sm">
                <FeatherIcon name="user" size={18} color={theme.colors.$primary} />
                <Text marginLeft="sm" color="$foreground">
                  {appointment.patient}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center" marginBottom="md">
                <FeatherIcon name="file" size={18} color={theme.colors.$primary} />
                <Text marginLeft="sm" color="$foreground">
                  {appointment.reason}
                </Text>
              </Box>

              <TouchableOpacity
                onPress={() => handleDeleteAppointment(appointment.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: theme.spacing.sm,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.$background,
                  marginTop: theme.spacing.sm,
                }}
              >
                <FeatherIcon name="trash" size={18} color={theme.colors.red} />
                <Text color="red" marginLeft="sm">
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