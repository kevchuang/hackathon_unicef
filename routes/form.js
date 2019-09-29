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
  console.log(req.body);
  console.log("DEBUG >>> Req body passed");
  if (req.body === undefined)
    console.log("Req body is undefined");
  else
    console.log("not undefined");
  var validateForm = formHandler.validateForm(req.body);
  if (validateForm.code === 400) {
    res.status(validateForm.code);
    res.send(validateForm)
  } else {
      delete validateForm.message.phoneNumber;
      var response = await firebaseHandler.postCertificate(validateForm.message);
      res.send(response);
  }
});


module.exports = router;