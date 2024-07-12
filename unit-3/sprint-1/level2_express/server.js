const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for serving directory listings
app.get("*", (req, res) => {
  const requestedPath = path.join(__dirname, req.path);

  fs.stat(requestedPath, (err, stats) => {
    if (err) {
      res.status(404).send("<h1>404 Not Found</h1>");
      return;
    }
    if (stats.isDirectory()) {
      serveDirectory(requestedPath, req.path, res);
    } else {
      serveFile(requestedPath, res);
    }
  });
});

const serveDirectory = (dirPath, urlPath, res) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.status(500).send("<h1>500 Internal Server Error</h1>");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Directory Listing</h1>");
    res.write("<ul>");
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const fileStat = fs.statSync(filePath);
      const icon = fileStat.isDirectory() ? "📁" : "📄";
      const fileUrl = path.join(urlPath, file).replace(/\\/g, "/");
      res.write(`<li>${icon} <a href="${fileUrl}">${file}</a></li>`);
    });
    res.write("</ul>");
    res.end();
  });
};

const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.status(500).send("<h1>500 Internal Server Error</h1>");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
};

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
