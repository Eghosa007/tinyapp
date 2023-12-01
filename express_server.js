// express_server.js

const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

const urlDatabase = {};

app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Route to handle form submission
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

// Route to handle shortURL requests
app.get("/urls/:id", (req, res) => {
  const templateVars = {
    shortURL: req.params.id,        // Assign the shortURL parameter from the request to templateVars
    longURL: urlDatabase[req.params.id],  // Retrieve the corresponding longURL from the urlDatabase
    id: req.params.id,              // Pass the id variable
  };
  res.render("urls_show", templateVars);  // Render the 'urls_show' template with templateVars
});


// Route to handle redirection for shortURLs
app.get("/u/:id", (req, res) => {
  const shortURL = req.params.id;
  const longURL = urlDatabase[shortURL];
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.status(404).send("Short URL not found");
  }
});

// Additional function to generate random string
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
