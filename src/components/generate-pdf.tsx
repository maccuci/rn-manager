import React from "react";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import Text from "@/atoms/text";
import { TouchableOpacity } from "@/atoms/touchable";

interface PDFGeneratorProps {
  appointments: Array<{
    id: string;
    date: string;
    appointmentType: string;
    patient: string;
    reason: string;
  }>;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ appointments }) => {
  const generatePDF = async () => {
    try {
      const appointmentsHtml = appointments
        .map(
          (appointment) => `
        <tr>
          <td>${new Date(appointment.date).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</td>
          <td>${appointment.appointmentType}</td>
          <td>${appointment.patient}</td>
          <td>${appointment.reason}</td>
        </tr>
      `
        )
        .join("");

      const { uri } = await Print.printToFileAsync({
        html: `
          <html>
            <head>
              <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h1>Lista de Consultas</h1>
              <table>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Paciente</th>
                  <th>Motivo</th>
                </tr>
                ${appointmentsHtml}
              </table>
            </body>
          </html>
        `,
      });

      console.log("PDF gerado em: ", uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        console.log("Compartilhamento não está disponível no dispositivo");
      }
    } catch (error) {
      console.error("Erro ao gerar PDF: ", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={generatePDF}
      style={{ padding: 10, backgroundColor: "#4CAF50", borderRadius: 5 }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        Gerar PDF
      </Text>
    </TouchableOpacity>
  );
};

export default PDFGenerator;
