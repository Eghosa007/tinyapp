// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Sample URL database
const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
  // ... other URLs
};

// GET route to render the index page
app.get('/urls', (req, res) => {
  const templateVars = {
    urls: urlDatabase,
  };
  res.render('urls_index', templateVars);
});

// POST route to handle URL deletion
app.post('/urls/:id/delete', (req, res) => {
  const shortURL = req.params.id;

  // Check if the URL exists in the database before attempting deletion
  if (urlDatabase[shortURL]) {
    // Use the delete operator to remove the URL
    delete urlDatabase[shortURL];
    console.log(`Deleted URL with shortURL: ${shortURL}`);
  } else {
    console.log(`URL with shortURL: ${shortURL} not found`);
  }

  // Redirect back to the urls_index page
  res.redirect('/urls');
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
