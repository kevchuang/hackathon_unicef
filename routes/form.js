const express = require('express');
const router = express.Router();
const formHandler = require("../public/javascripts/FormHandler.js");

router.post('/certificate/validate',  function (req, res) {
  res.send({result: "success", data: formHandler.validateForm(req.body)})
});

router.get('/certificate/creation',  function (req, res) {
  res.send({result: "success"})
});


module.exports = router;