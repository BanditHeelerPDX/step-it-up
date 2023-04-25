const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3030;
const routes = require('./controllers');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
})
};

const app = express();

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Welcome back, all you hepcats out there! You're listening to the smooth, sultry sounds of ${PORT}, the PORT!`));
});