import express from "express";

import {
  addPatient,
  addEmergencyPatient,
  getQueue,
  callNextPatient,
  completeConsultation,
  getQueueSummary,
  getDoctorQueue
} from "../controllers/queue.controller.js";

const router = express.Router();

router.post(
  "/add-patient",
  addPatient
);

router.get(
  "/queue",
  getQueue
);

router.post(
  "/call-next",
  callNextPatient
);

router.get(
  "/summary",
  getQueueSummary
);
router.put(
  "/complete-consultation",
  completeConsultation
);
router.post(
  "/emergency",
  addEmergencyPatient
);
router.get(
  "/doctor/:doctorName",
  getDoctorQueue
);
export default router;