import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.send("Username already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        await newUser.save();
            res.send(`
                <h2>Registration successful</h2>
                <a href="/login.html">Go to Login</a>
                `)
       

    } catch (error) {

        console.log(error);
        res.status(500).send("server error");
    }
});


// LOGIN
router.post(
    "/login",

    passport.authenticate("local", {
        successRedirect: "/dashboard.html",
        failureRedirect: "/login.html"
    })
);


// LOGOUT
router.get("/logout", (req, res) => {

    req.logout((error) => {

        if (error) {
            return res.status(500).send("Logout failed");
        }

        res.redirect("/login.html");
    });
});


export default router;