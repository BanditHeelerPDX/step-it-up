const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
       email: req.body.email,
      },
    });
    if (existingUser) {
      return res.status(409).json({ message: 'The email you are attempting to register with already exists in our system.  Check your spelling or try another.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 16);
    const newUser = await User.create({
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (!user) {
      return res.status(409).json({ message: 'The email you are attempting to login with does not exist in our system, please register or check your spelling.' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.session.user = { id: user.id, email: user.email };
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to access this resource' });
};

router.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.session.user.email}` });
});

module.exports = router;
