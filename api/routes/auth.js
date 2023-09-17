import express from "express";
import { register,login } from "../controllers/auth.js";

const router = express.Router();

  //connect to api , call register function to register user 
   
router.post("/register", register)
//call login function to login existing user 
router.post("/login", login)
 

export default router;