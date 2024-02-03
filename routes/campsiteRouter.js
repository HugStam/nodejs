//the module will contain the routes for campsites and camsitesId

const express = require("express");
const campsiteRouter = express.Router(); // object name campsiteRouter to use with express routing methods

campsiteRouter
  .route("/")

  // routing method default
  .all((req, res, next) => {
    res.statusCode = 200;
    //this indicate that it will return plain text
    res.setHeader("Content-Type", "test/plain");
    next(); // this passes controle to the next routing method
  })

  //set up an end point for the get request

  .get((req, res) => {
    res.end("Will send all the campsites to you"); //msg sent to the client
  })

  .post((req, res) => {
    //this will be json data
    res.end(
      `Will add the campsites:${req.body.name} with description:${req.body.description}`
    );
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /campsites");
  })

  .delete((req, res) => {
    res.end("Deleting all campsites");
  });

module.exports = campsiteRouter;