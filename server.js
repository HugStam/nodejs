const express = require("express");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("div"));
app.use(express.json()); //express is mw for parse json to Js

// routing method default
app.all("/campsites", (req, res, next) => {
  res.statusCode = 200;
  //this indicate that it will return plain text
  res.setHeader("Content-Type", "test/plain");
  next(); // this passes controle to the next routing method
});

//set up an end point for the get request

app.get("/campsites", (req, res) => {
  res.end("Will send all the campsites to you"); //msg sent to the client
});

app.post("/campsites", (req, res) => {
  //this will be json data
  res.end(
    `Will add the campsites:${req.body.name} with description:${req.body.description}`
  );
});

app.put("/campsites", (req, res) => {
  res.statusCode = 403;
  res.end("Put operation not supported on /campsites");
});

app.delete("/campsites", (req, res) => {
  res.end("Deleting all campsites");
});

//add support for 4 more end points using a route parameter to the end of path:/campsiteId

app.get("/campsites/:campsiteId", (req, res) => {
  res.end(
    `Will send the details of the campsite: ${req.params.campsiteId} to you`
  );
});
app.post("/campsites/:campsiteId", (req, res) => {
  res.statusCode = 403;
  res.end(
    `POST operation not supported on /campsites/:${req.params.campsiteId}`
  );
});

app.put("/campsites/:campsiteId", (req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
  res.end(`Will update the campsite: ${req.body.name}
        with description:${req.body.description}`);
});

app.delete("/campsites/:campsiteId", (req, res) => {
  res.end(`Deleing campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
