import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity,countByType,getHotelRooms } from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

//connect to api

//Commenting below code since we have added this piece of code in controllers
/*  
 //CREATE new hotel
 router.post("/", async(req,res)=>{
    const newHotel = new Hotel(req.body);
    try {
        
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
      } catch (err) {
        res.status(500).json(err);
      }
  })

   //Update existing hotel using unique id of hotel
 router.put("/:id", async(req,res)=>{
    try {
        
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },//use $set menthod to update
            { new: true }
          );
          res.status(200).json(updatedHotel);
      } catch (err) {
        res.status(500).json(err);
      }
  })

//Delete existing hotel using unique id of hotel
router.delete("/:id", async(req,res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }
    catch (err) {
        res.status(500).json(err);
      }
  })

  //Get existing hotel using unique id of hotel
router.get("/:id", async(req,res)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch (err) {
        res.status(500).json(err);
      }
  })


    //Get all hotel details
router.get("/", async(req,res, next)=>{
  try {
      const hotels = await Hotel.find(req.params.id);
      res.status(200).json(hotels);
  }
  catch (err) {
      next(err)
    }
}) */

 //CREATE new Hotel using createHotel function in controllers folders from hotel.js file
router.post("/",verifyAdmin,createHotel);

//UPDATE existing Hotel using updateHotel function based on unique controllers folders from hotel.js file
router.put("/:id",verifyAdmin, updateHotel);

//DELETE existing Hotel using deleteHotel function based on unique controllers folders from hotel.js file
router.delete("/:id",verifyAdmin, deleteHotel);

//GET existing Hotel using getHotel function based on unique controllers folders from hotel.js file

router.get("/find/:id", getHotel);

//GET ALL existing Hotel details using getHotels function based on unique controllers folders from hotel.js file

router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
