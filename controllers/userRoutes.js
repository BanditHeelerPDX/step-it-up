const router = require('express').Router();
const User = require('../models/User');
const authorized = require('../utils/auth');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(400).json({ message: 'You mad, bro? Try using a registered email.' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Do you even lift? That password needs to work on its delts.' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            res.status(200).json({ user: userData, message: 'You\'re broactive now, bro!' });
        });
        } catch (err) {
            res.status(400).json(err);
        }
});

router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('register');
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            res.status(200).json({ user: userData, message: 'You\'re broactive now, bro!' });
        });
        } catch (err) {
            res.status(400).json(err);
        }
});

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/dashboard', authorized, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
            });
        const user = userData.get({ plain: true });
        res.render('dashboard', { user });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;