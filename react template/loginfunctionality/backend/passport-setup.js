const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User'); // Define your User model


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//             done(null, existingUser);
//         } else {
//             new User({ googleId: profile.id }).save().then((user) => done(null, user));
//         }
//     });
// }));

const OAuth2Strategy = require('passport-oauth2');

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://yourapp.com/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    // Your verification logic here
}));


// Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'email']
// }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ facebookId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//             done(null, existingUser);
//         } else {
//             new User({ facebookId: profile.id }).save().then((user) => done(null, user));
//         }
//     });
// }));
