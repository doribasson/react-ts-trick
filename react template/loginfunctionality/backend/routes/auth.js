const router = require('express').Router();
const passport = require('passport');



router.get('/google', (req, res) => {
    res.json({ message: 'Hello from the Node.js server!' });
});

// Auth with Google
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000'); // Redirect to your frontend
});

// Auth with Facebook
router.get('/facebook', passport.authenticate('facebook'));

// Callback route for Facebook to redirect to
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('http://localhost:3000'); // Redirect to your frontend
});

module.exports = router;
