import Patient from "../models/Patient.js";

export const calculateAverageTime =
  async () => {
    try {

      const completedPatients =
        await Patient.find({
          status: "completed",
          consultationStart: {
            $exists: true,
          },
          consultationEnd: {
            $exists: true,
          },
        });

      if (
        completedPatients.length === 0
      ) {
        return 8;
      }

      let totalMinutes = 0;

      completedPatients.forEach(
        (patient) => {

          const minutes =
            (
              patient.consultationEnd -
              patient.consultationStart
            ) /
            1000 /
            60;

          totalMinutes += minutes;

        }
      );

      return Math.round(
        totalMinutes /
        completedPatients.length
      );

    } catch (error) {

      return 8;

    }
  };