import Container from "@/atoms/container";
import Text from "@/atoms/text";
import { HeaderBar } from "@/components/header";
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { HomeDrawerParamList, RootStackParamList } from "@/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
import { Picker } from "@react-native-picker/picker";

export default function MobileMainScreen() {
  const navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  > = useNavigation();

  const { appointments, loadAppointments } = useAppointments();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleSidebarToggle = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  const screenWidth = Dimensions.get("window").width;

  const groupAppointmentsByMonth = (appointments: Appointment[]) => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const grouped = new Array(12).fill(0);

    appointments.forEach((appointment) => {
      const monthIndex = new Date(appointment.date).getMonth();
      grouped[monthIndex] += 1;
    });

    return {
      labels: months,
      datasets: [
        {
          data: grouped,
          strokeWidth: 2,
        },
      ],
    };
  };

  const groupAppointmentsByType = (appointments: Appointment[]) => {
    const typeCounts = appointments.reduce((acc, appointment) => {
      const type = appointment.appointmentType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const colors = ["#FFF", "#000"];
    let colorIndex = 0;

    return Object.entries(typeCounts).map(([name, population]) => {
      colorIndex = (colorIndex + 1) % colors.length;
      return {
        name,
        population,
        color: colors[colorIndex],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    });
  };

  const appointmentsDataByMonth = groupAppointmentsByMonth(appointments);
  const appointmentsDataByType = groupAppointmentsByType(appointments);

  return (
    <Container alignItems="center" justifyContent="center">
      <HeaderBar
        onSidebarToggle={handleSidebarToggle}
        isOpen={navigation.isFocused()}
      />
      <Text variant="title" textAlign="center" mb="xl" color="$primary">
        Seja bem-vindo ao aplicativo de gerenciamento de consultas
      </Text>
      <Text variant="navbar" textAlign="center" color="$primary" mb="md">
        Número de consultas por mês
      </Text>
      <LineChart
        data={appointmentsDataByMonth}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text variant="navbar" textAlign="center" color="$primary" mt="xxl">
        Número dos tipos de consultas
      </Text>
      <PieChart
        data={appointmentsDataByType}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </Container>
  );
}
