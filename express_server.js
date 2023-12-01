const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Route to handle form submission
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (you will replace this)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
