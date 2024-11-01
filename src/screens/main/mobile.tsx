import { useCallback, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LineChart, PieChart } from "react-native-chart-kit";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "@shopify/restyle";
import Container from "@/atoms/container";
import Text from "@/atoms/text";
import Box from "@/atoms/box";
import { HeaderBar } from "@/components/header";
import { HomeDrawerParamList, RootStackParamList } from "@/navigation";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
import { Theme } from "@/themes";

export default function MobileMainScreen() {
  const theme = useTheme<Theme>();
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        DrawerNavigationProp<HomeDrawerParamList>,
        NativeStackNavigationProp<RootStackParamList>
      >
    >();

  const { appointments, loadAppointments } = useAppointments();
  const [selectedMonth] = useState(new Date().getMonth());
  const screenWidth = Dimensions.get("window").width;

  const handleSidebarToggle = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  const chartConfig = {
    backgroundColor: theme.colors.$fieldInputBackground,
    backgroundGradientFrom: theme.colors.$fieldInputBackground,
    backgroundGradientTo: theme.colors.$fieldInputBackground,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 133, 208, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(32, 32, 32, ${opacity})`,
    style: {
      borderRadius: theme.borderRadii.xs,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.colors.$primary,
    },
  };

  const groupAppointmentsByMonth = useCallback(
    (appointments: Appointment[]) => {
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
            color: (opacity = 1) => theme.colors.$primary,
            strokeWidth: 2,
          },
        ],
      };
    },
    [theme.colors.$primary]
  );

  const getTodaysAppointments = useCallback(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return appointments.filter(
      (apt) => new Date(apt.date).setHours(0, 0, 0, 0) === today
    );
  }, [appointments]);

  const getNextAppointment = useCallback(() => {
    const now = new Date();
    const upcoming = appointments
      .filter((apt) => new Date(apt.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return upcoming[0];
  }, [appointments]);

  const formatNextAppointment = useCallback(() =>{
    const next = getNextAppointment();

    if(!next) {
      return {
        time: "Sem consultas",
        distance: "---"
      }
    }

    const date = new Date(next.date);

    return {
      time: format(date, "dd/MM - HH:mm"),
      distance: formatDistance(date, new Date(), {
        locale: ptBR,
        addSuffix: true
      })
    }
  }, [getNextAppointment])

  return (
    <Container backgroundColor="$background" flex={1}>
      <HeaderBar
        onSidebarToggle={handleSidebarToggle}
        isOpen={navigation.isFocused()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box padding="lg">
          <Text
            variant="title"
            textAlign="center"
            marginBottom="xl"
            color="$primary"
            fontSize={24}
            fontWeight="600"
          >
            Dra. Camila Consultório Odontológico
          </Text>

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
            <Text
              variant="navbar"
              color="$foreground"
              fontSize={16}
              marginBottom="md"
            >
              {format(new Date(), "'Hoje,' dd 'de' MMMM", { locale: ptBR })}
            </Text>
            <Text
              variant="sidebar"
              color="$primary"
              fontSize={20}
              fontWeight="600"
            >
              {getTodaysAppointments().length} consultas agendadas
            </Text>
          </Box>

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
            <Text
              variant="navbar"
              color="$foreground"
              fontSize={18}
              marginBottom="md"
              fontWeight="600"
            >
              Consultas por Mês
            </Text>
            <LineChart
              data={groupAppointmentsByMonth(appointments)}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: theme.borderRadii.xs,
              }}
            />
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="lg"
          >
            <Box
              backgroundColor="$fieldInputBackground"
              padding="lg"
              borderRadius="sm"
              flex={1}
              marginRight="md"
              shadowColor="$foreground"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              <Text color="$foreground" fontSize={14}>
                Total do Mês
              </Text>
              <Text color="$primary" fontSize={24} fontWeight="600">
                {
                  appointments.filter(
                    (apt) => new Date(apt.date).getMonth() === selectedMonth
                  ).length
                }
              </Text>
            </Box>
            <Box
              backgroundColor="$fieldInputBackground"
              padding="lg"
              borderRadius="sm"
              flex={1}
              marginLeft="md"
              shadowColor="$foreground"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              <Text color="$foreground" fontSize={14}>
                Próxima Consulta
              </Text>
              <Text color="$primary" fontSize={16} fontWeight="600">
                {formatNextAppointment().time}
              </Text>
              <Text color="$primary" fontSize={16} fontWeight="600">
                {formatNextAppointment().distance}
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
}
