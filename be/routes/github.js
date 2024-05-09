const express = require("express");
const github = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const userModel = require("../models/user");

require("dotenv").config();

github.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(passport.initialize());

passport.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    console.log("1234");
    const redirectUrl = `http://localhost:3000/cart?user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`;
    res.redirect(redirectUrl);
  }
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, process.env.SECRET_KEY);
    console.log("ciao");
    console.log(token);

    const redirectUrl = `http://localhost:3000/login?token=${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  }
);

module.exports = github;
