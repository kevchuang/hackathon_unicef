const express = require('express');
const firebaseHandler = require("../public/javascripts/FirebaseHandler.js");
const router = express.Router();
const formHandler = require("../public/javascripts/FormHandler.js");

router.post('/certificate/validate',  function (req, res) {
  var validateForm = formHandler.validateForm(req.body);
  res.status(validateForm.code);
  res.send(formHandler.validateForm(req.body));
});

router.post('/certificate/create',  async function (req, res, next) {
  try {
    const userAuthorized = await firebaseHandler.getAddress(req.body.phoneNumber);
    if (userAuthorized.authorized) {
      var validateForm = formHandler.validateForm(req.body);
      if (validateForm.code === 400) {
        res.status(validateForm.code);
        res.send(validateForm)
      } else {
          delete validateForm.message.phoneNumber;
          var response = await firebaseHandler.postCertificate(validateForm.message);
          res.status(response.code).send(response.message);
      }
    } else {
      res.status(403).send({result: "error", message: "You are not authorized for that type of action"})
    }
  } catch (error) {
    next(error);
  }
});

router.post('/certificate/retrieve',  async function (req, res, next) {
  try {
    const userAuthorized = await firebaseHandler.getAddress(req.body.phoneNumber);
    if (userAuthorized.authorized) {
      var validateForm = formHandler.validateForm2(req.body);
      if (validateForm.code === 400) {
        res.status(validateForm.code);
        res.send(validateForm)
      } else {
          var queryData = validateForm.message;
          var response = await firebaseHandler.getCertificate(
            queryData.firstname,
            queryData.middlename,
            queryData.lastname,
            queryData.gender,
            queryData.birthPlace,
            queryData.birthdate);
          
          res.status(response.code).send(response);
      }
    } else {
      res.status(403).send({result: "error", message: "You are not authorized for that type of action"})
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;