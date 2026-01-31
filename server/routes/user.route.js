import express from "express";
import {
  createAdvocate,
  getEnrollmentAdvocate,
  bulkCreateAdvocates,
  searchAdvocateByName
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/", createAdvocate);
router.post("/bulk", bulkCreateAdvocates);
// Change this line to use your specific enrollment function
router.get("/search", getEnrollmentAdvocate);
router.get("/search-name", searchAdvocateByName);

export default router;