import express from "express";
import {
  createHouse,
  deleteHouse,
  getHouse,
  getHouses,
  updateHouse,
} from "../controllers/housesController.js";

const router = express.Router();

router.post("/", createHouse);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);
router.get("/:id", getHouse);
router.get("/", getHouses);

export default router;
