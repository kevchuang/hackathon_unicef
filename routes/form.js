const express = require('express');
const firebaseHandler = require("../public/javascripts/FirebaseHandler.js");
const router = express.Router();
const formHandler = require("../public/javascripts/FormHandler.js");

router.post('/certificate/validate',  function (req, res) {
  var validateForm = formHandler.validateForm(req.body);
  res.status(validateForm.code);
  res.send(formHandler.validateForm(req.body));
});

router.post('/certificate/create',  function (req, res) {
  firebaseHandler.postCertificate(req.body.message);

});


module.exports = router;