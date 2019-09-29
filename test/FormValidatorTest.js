var FormValidator = require("../public/javascripts/FormValidator.js");

var a = {"firstname": "Greta",
    "lastname": "Thunberg",
    "middlename": "",
    "gender": "F",
    "birthPlace": "Vill2e, Pays",
    "birthdate": "2003-01-03",
    "parent1": "Malena Ernman",
    "parent2": "Svante Thunberg",
    "dateRecognitionParent1": "2003-01-04",
    "dateRecognitionParent2": "2003-01-04"
};

console.log(FormValidator.isDateValid("2000-08-12") === true);
console.log(FormValidator.isDateValid("20a0-08-12") === false);
console.log(FormValidator.isDateValid("2050-08-12") === false);

console.log(FormValidator.isNameValid("Kévin") === true);
console.log(FormValidator.isNameValid("Jean-Pierre") === true);
console.log(FormValidator.isNameValid("waris") === false);
console.log(FormValidator.isNameValid("Louis14") === false);
console.log(FormValidator.isNameValid("Mc'Flurry") === true);

console.log(FormValidator.checkAllData(a));