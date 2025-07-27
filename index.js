const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const path = require('path');
const URL = require('./model/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const app = express();
const port = 8001;

// Connect to MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url').then(() => {
  console.log("Mongodb connected");
});

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/user", userRoute);
app.use("/", staticRoute);
app.use("/url", urlRoute); 

// For viewing all URLs (admin/debug)
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls  
  });
});

// Redirect from short URL to original URL
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  console.log(entry);

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
