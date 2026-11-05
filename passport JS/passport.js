import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "./models/User.js";

passport.use(
    new LocalStrategy(async (username, password, done) => {

        try {

            // Find user in database
            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }

            // Compare password
            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            }

            // Authentication successful
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    })
);


// Store user ID in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// Retrieve user from database
passport.deserializeUser(async (id, done) => {

    try {

        const user = await User.findById(id);

        done(null, user);

    } catch (error) {

        done(error);
    }
});

export default passport;