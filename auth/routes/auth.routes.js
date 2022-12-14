const express = require('express');
const { getToken, signUp, validateToken } = require('../controllers/auth');
const router = express.Router();
const passport = require("passport");

/**
 * @typedef AuthReq
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef SignUpReq
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required - must be admin/moderator/client
 */

/**
 * Get token if valid login credentials
 * @route POST /auth/login
 * @group Auth
 * @param {AuthReq.model} AuthReq.body.required
 * @returns {object} 200 - {token: token}
 */
router.post('/login', getToken);

/**
 * Signup user
 * @route POST /auth/signup
 * @group Auth
 * @param {SignUpReq.model} SignUpReq.body.required
 * @returns {object} 201 - {token: token}
 */
router.post('/signup', signUp);

/**
 * Validate JWT token
 * @route GET /auth/validate
 * @group Auth
 * @param {string} token.query.required
 * @returns {object} 201 - {token: token}
 */
router.get('/validate', validateToken);


router.get("/login/success", (req, res) => {
    if (req.user) {
        // console.log("User", req.user)
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
