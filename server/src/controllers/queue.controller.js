import Patient from "../models/Patient.js";
import { io } from "../../index.js";
import { calculateAverageTime } from "../services/waitTime.service.js";

// Add Normal Patient
export const addPatient = async (req, res) => {
  try {
    const {
      patientName,
      phone,
      age,
      doctor,
    } = req.body;

    const lastPatient =
      await Patient.findOne().sort({
        tokenNumber: -1,
      });

    const nextToken =
      lastPatient
        ? lastPatient.tokenNumber + 1
        : 101;

    const patient =
      await Patient.create({
        tokenNumber: nextToken,
        patientName,
        phone,
        age,
        doctor,
        priority: "normal",
      });

    io.emit("queueUpdated");

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Emergency Patient
export const addEmergencyPatient = async (
  req,
  res
) => {
  try {
    const {
      patientName,
      phone,
      age,
      doctor,
    } = req.body;

    const lastPatient =
      await Patient.findOne().sort({
        tokenNumber: -1,
      });

    const nextToken =
      lastPatient
        ? lastPatient.tokenNumber + 1
        : 101;

    const patient =
      await Patient.create({
        tokenNumber: nextToken,
        patientName,
        phone,
        age,
        doctor,
        priority: "emergency",
      });

    io.emit("queueUpdated");

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Full Queue
export const getQueue = async (
  req,
  res
) => {
  try {
    const queue =
      await Patient.find().sort({
        tokenNumber: 1,
      });

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Call Next Patient
export const callNextPatient =
  async (req, res) => {
    try {
      const currentServing =
        await Patient.findOne({
          status: "serving",
        });

      if (currentServing) {
        currentServing.status =
          "completed";

        currentServing.consultationEnd =
          new Date();

        await currentServing.save();
      }

      const nextPatient =
        await Patient.findOne({
          status: "waiting",
        }).sort({
          priority: -1,
          tokenNumber: 1,
        });

      if (!nextPatient) {
        return res.status(404).json({
          message:
            "No patients in queue",
        });
      }

      nextPatient.status =
        "serving";

      nextPatient.consultationStart =
        new Date();

      await nextPatient.save();

      io.emit("queueUpdated", {
        type:
          "NEXT_PATIENT_CALLED",
        patient: nextPatient,
      });

      res.json({
        message:
          "Next patient called",
        patient: nextPatient,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Complete Consultation
export const completeConsultation =
  async (req, res) => {
    try {
      const currentPatient =
        await Patient.findOne({
          status: "serving",
        });

      if (!currentPatient) {
        return res.status(404).json({
          message:
            "No active consultation",
        });
      }

      currentPatient.status =
        "completed";

      currentPatient.consultationEnd =
        new Date();

      await currentPatient.save();

      io.emit("queueUpdated");

      res.json({
        message:
          "Consultation completed",
        patient:
          currentPatient,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Get Doctor Queue
export const getDoctorQueue =
  async (req, res) => {
    try {
      const doctor =
        req.params.doctorName;

      const patients =
        await Patient.find({
          doctor,
          status: "waiting",
        }).sort({
          tokenNumber: 1,
        });

      res.json(patients);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Dashboard Summary
export const getQueueSummary =
  async (req, res) => {
    try {
      const serving =
        await Patient.findOne({
          status: "serving",
        });

      const waitingCount =
        await Patient.countDocuments({
          status: "waiting",
        });

      const completedCount =
        await Patient.countDocuments({
          status: "completed",
        });

      const emergencyCount =
        await Patient.countDocuments({
          status: "waiting",
          priority:
            "emergency",
        });

      const avgTime =
        await calculateAverageTime();

      res.json({
        currentToken:
          serving?.tokenNumber ||
          null,

        currentPatient:
          serving?.patientName ||
          null,

        waitingCount,

        completedCount,

        emergencyCount,

        avgTime,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };