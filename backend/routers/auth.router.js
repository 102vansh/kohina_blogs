const express = require('express');
const { register, login, logout } = require('../controller/auth.controller');
const { isauthenticated } = require('../middleware/auth');
const passport = require('passport');
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(isauthenticated,logout)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:5173');
  }
);

router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;