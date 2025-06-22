import { Router } from "express";
import {body} from 'express-validator'
import { registerUser ,loginUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post([
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min: 3}).withMessage("Name must be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
], registerUser)

router.route("/login").post([
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],loginUser)
export default router