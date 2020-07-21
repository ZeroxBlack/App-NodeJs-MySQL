const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { route } = require('.');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

/*
other way to authenticate

router.post('/signup', (req, res) => {
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

    res.send('received');
});
*/

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

// to profile page
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

// to logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;