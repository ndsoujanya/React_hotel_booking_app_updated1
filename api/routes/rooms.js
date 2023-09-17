import express from "express";
import Room from "../models/Room.js";
import { verifyAdmin} from "../utils/verifyToken.js";
import { createRoom,updateRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms } from "../controllers/room.js";


const router = express.Router();
//CREATE room
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE room
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

//DELETE room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET room

router.get("/:id", getRoom);
//GET ALL rooms

router.get("/", getRooms);

export default router;
