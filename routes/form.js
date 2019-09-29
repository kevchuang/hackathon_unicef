const express = require('express');
const firebaseHandler = require("../public/javascripts/FirebaseHandler.js");
const router = express.Router();
const formHandler = require("../public/javascripts/FormHandler.js");

router.post('/certificate/validate',  function (req, res) {
  var validateForm = formHandler.validateForm(req.body);
  res.status(validateForm.code);
  res.send(formHandler.validateForm(req.body));
});

router.post('/certificate/create',  async function (req, res) {
  var certificate = formHandler.parseForm(req.body);
  delete certificate.phoneNumber;
  var response = await firebaseHandler.postCertificate(certificate);
  res.send(response);
});


module.exports = router;