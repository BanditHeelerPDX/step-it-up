const router = require('express').Router();
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

router.use('/userRoutes', userRoutes);
router.use('/homeRoutes', homeRoutes);
router.use('/dashboardRoutes', dashboardRoutes);

module.exports = router;