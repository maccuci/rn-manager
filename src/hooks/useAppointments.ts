import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Appointment {
  id: string;
  date: string;
  appointmentType: string;
  patient: string;
  reason: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = useCallback(async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  }, []);

  const saveAppointments = useCallback(
    async (updatedAppointments: Appointment[]) => {
      try {
        await AsyncStorage.setItem(
          "appointments",
          JSON.stringify(updatedAppointments)
        );
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Failed to save appointments:", error);
      }
    },
    []
  );

  const addAppointment = useCallback(
    (newAppointment: Omit<Appointment, "id">) => {
      const appointmentWithId: Appointment = {
        ...newAppointment,
        id: Date.now().toString(),
      };
      saveAppointments([...appointments, appointmentWithId]);
    },
    [appointments, saveAppointments]
  );

  const deleteAppointment = useCallback(
    (id: string) => {
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      saveAppointments(updatedAppointments);
    },
    [appointments, saveAppointments]
  );

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return {
    appointments,
    addAppointment,
    deleteAppointment,
    loadAppointments,
  };
};
