import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
  } from "../controllers/user.js";
  import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE user details if owner/user of account
router.put("/:id", verifyUser, updateUser);

//DELETE user details if owner/user of account
router.delete("/:id", verifyUser, deleteUser);

//GET user details if owner/user of account
router.get("/:id", verifyUser, getUser);

//GET ALL user details if admin
router.get("/", verifyAdmin, getUsers);

export default router;
