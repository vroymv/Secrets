//jshint esversion:6
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var findOrCreate = require("mongoose-findorcreate");
var TwitterStrategy = require("passport-twitter").Strategy;

const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  twitterId: String,
});

const options = {
  hashField: "password",
};

userSchema.plugin(passportLocalMongoose, options);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("user", userSchema);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

passport.use(User.createStrategy());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { username: profile.displayName, googleId: profile.id },
        function (err, user) {
          console.log(user);
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/secrets",
    },
    function (token, tokenSecret, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { username: profile.displayName, twitterId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

// Secret Post DB
const secretSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  twitterId: String,
  secret: String,
});

secretSchema.plugin(passportLocalMongoose, options);
// secretSchema.plugin(findOrCreate);
const Secret = new mongoose.model("secret", secretSchema);

app.get("/home", function (req, res) {
  res.render("home");
});

app
  .route("/register")
  .get(function (req, res) {
    res.render("register");
  })
  .post(async function (req, res) {
    try {
      User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
          if (err) {
            res.redirect("/register");
            console.log(err);
          } else {
            res.redirect("/login");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

app
  .route("/login")
  .get(function (req, res) {
    res.render("login");
  })
  .post(function (req, res) {
    const authenticate = User.authenticate();
    authenticate(req.body.username, req.body.password, function (err, result) {
      if (err) {
        console.log("Sorry user not found!");
      } else {
        if (result) {
          req.session.user = {
            username: result.username,
          };
          res.redirect("/secrets");
        } else {
          res.redirect("/login");
        }
      }
    });
  });

var login =
  '<a class="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>';
var submit =
  '<a class="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>\r\n';

app.get("/secrets", async function (req, res) {
  try {
    console.log(req.session);
    if (!req.session.user && !req.session.passport) {
      res.redirect("/login");
    } else {
      if (req.session.user) {
        let usersSecrets = await Secret.find(
          { username: req.session.user.username },
          { _id: 0, secret: 1 }
        );
        res.render("secrets", {
          secrets: usersSecrets,
          login: login,
          submit: submit,
          intro: "You've Discovered My Secrets!",
        });
      } else if (req.session.passport.user) {
        let usersSecrets = await Secret.find(
          { username: req.session.passport.user.username },
          { _id: 0, secret: 1 }
        );
        res.render("secrets", {
          secrets: usersSecrets,
          login: login,
          submit: submit,
          intro: "You've Discovered My Secrets!",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", function (req, res) {
  if (req.session.user || req.session.passport.user) {
    req.session.destroy();
    res.redirect("/home");
  } else {
    res.redirect("/home");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

app.get(
  "/auth/twitter/secrets",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

app
  .route("/submit")
  .get(function (req, res) {
    if (req.session.user || req.session.passport.user) {
      res.render("submit");
    } else {
      res.send("Sorry, you don't have access");
    }
  })
  .post(async function (req, res) {
    try {
      if (req.session.passport) {
        const newSecret = new Secret({
          username: req.session.passport.user.username,
          googleId: req.session.passport.user.id,
          secret: req.body.secret,
        });

        await newSecret.save();
      } else {
        const newSecret = new Secret({
          username: req.session.user.username,
          secret: req.body.secret,
        });

        await newSecret.save();
      }
    } catch (error) {
      console.log(error);
    } finally {
      res.redirect("/secrets");
    }
  });

app.get("/allSecrets", async function (req, res) {
  try {
    const allSecrets = await Secret.find({}, { _id: 0, secret: 1 });
    res.render("secrets", {
      secrets: allSecrets,
      login: "",
      submit: "",
      intro: "See Secrets Others Shared!",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log("Server successfully start on port  3000");
});
