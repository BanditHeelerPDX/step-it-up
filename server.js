const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3030;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

const app = express();

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("homepage", homepage);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `Welcome back, all you hepcats out there! You're listening to the smooth, sultry sounds of ${PORT}, the PORT!`
    )
  );
});
