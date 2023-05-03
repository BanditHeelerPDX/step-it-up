const loginNavLink = document.getElementById("logLink");

loginNavLink.addEventListener("click", (event) => {
  event.preventDefault();

  render("login.handlebars");
});

const registerNavLink = document.getElementById("regLink");

registerNavLink.addEventListener("click", (event) => {
  event.preventDefault();

  render("register.handlebars");
});

const dashLink = document.getElementById("dashLink");

dashLink.addEventListener("click", (event) => {
  event.preventDefault();

  render("dashboard.handlebars");
});
