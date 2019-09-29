const express = require('express');
const router = express.Router();
const formHandler = require("../public/javascripts/FormHandler.js");

router.post('/certificate',  function (req, res, next) {
  console.log(req)
  res.send({result: "success", data: req.body})
});

router.get('/certificate',  function (req, res, next) {
  res.send({result: "success"})
});


module.exports = router;