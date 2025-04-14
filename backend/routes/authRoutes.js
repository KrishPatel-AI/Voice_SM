const express = require('express');
const { signup, login } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.redirect(`/?token=${token}`); // frontend can parse this token from URL
  }
);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // optional: clear the session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
