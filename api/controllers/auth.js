import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//to register/create user who can book hotels
export const register = async (req, res, next) => {
  try {
 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

//to login using existing user cred
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));
//bcrypt.compare function is used to compare hash password and user entered readacble password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password !"));

      //if password is correct create token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
  

      const { password, isAdmin, ...otherDetails } = user._doc;
         res.cookie("access_token", token, {
        httpOnly: true,
      }
      )
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });

 
  } catch (err) {
    next(err);
  }
};
