const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // replace "*" with your Wix URL if you want
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing url query parameter" });

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
