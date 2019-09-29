var Constants = require("../utils/Constants.js")
var moment = require("moment");

const FormValidator = {
    stringToASCII(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },

    isNameValid(name) {
        /** Check if name is valid (only ASCII characters)
         * return a bool
         */
        var regex = /^[A-Z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
        return regex.test(FormValidator.stringToASCII(name));
    },

    isGenderValid(gender) {
        /** Check if gender is valid (F, f, M, U or u)
         * return a bool
         */
        var regex = /^[FfMmUu]$/;
        return regex.test(gender)
    },

    isDateValid(date) {
        /** Check if date is valid (YYYY-MM-DD) and is before now
         * return a bool
         */
        var regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
        if (regex.test(date)) {
            if (moment(date, "YYYY-MM-DD").isValid()) {
                return moment(date).isBefore(moment().format("YYYY-MM-DD")) || moment(date).isSame(moment().format("YYYY-MM-DD"));
            }
        }

        return false
    },

    isPlaceValid(place) {
        /** Check if the place is correct (France, Paris)
         * return a bool
         */
        var regex = /^[A-Z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*\s?,\s?[A-Z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
        return regex.test(FormValidator.stringToASCII(place));
    },

    checkData(checkFieldFunction, field, errorMsg, mandatory = true) {
        /** f: function to check the data, data: String, msg: the error message, mandatory: Boolean
         * Return a string with a error message. "" (empty string if no error)
         */

        if (mandatory || field !== "") {
            if (checkFieldFunction(field)) {
                return "";
            } else {
                return errorMsg;
            }
        }
        return "";
    },

    checkAllData(jsonObject) {
        /** Return a string with the list of message error. "" (empty string if no error)
         * data is a JSON object
         */

        if (Constants.CERTIFICATE_ARRAY.every(field => jsonObject.hasOwnProperty(field))) {

            var errorString = FormValidator.checkData(FormValidator.isNameValid, jsonObject.firstname, "1 (First Name), ") +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.middlename, "2 (Middle Name), ", false) +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.lastname, "3 (Last Name), ") +
                FormValidator.checkData(FormValidator.isGenderValid, jsonObject.gender, "4 (Gender), ") +
                FormValidator.checkData(FormValidator.isPlaceValid, jsonObject.birthPlace, "5 (Birth Place), ") +
                FormValidator.checkData(FormValidator.isDateValid, jsonObject.birthdate, "6 (Birth Date), ") +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.parent1, "7 (Parent 1), ", false) +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.parent2, "8 (Parent 2), ", false) +
                FormValidator.checkData(FormValidator.isDateValid, jsonObject.dateRecognitionParent1, "9 (Date recognition parent), ", false) +
                FormValidator.checkData(FormValidator.isDateValid, jsonObject.dateRecognitionParent2, "10 (Date recognition parent), ", false);

        } else {
            errorString = "missing fields  "
        }
        return errorString
    },

    checkAllData2(jsonObject) {
        /** Return a string with the list of message error. "" (empty string if no error)
         * data is a JSON object
         */

        if (Constants.RETRIEVE_CERTIFICATE_ARRAY.every(field => jsonObject.hasOwnProperty(field))) {

            var errorString = FormValidator.checkData(FormValidator.isNameValid, jsonObject.firstname, "1 (First Name), ") +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.middlename, "2 (Middle Name), ", false) +
                FormValidator.checkData(FormValidator.isNameValid, jsonObject.lastname, "3 (Last Name), ") +
                FormValidator.checkData(FormValidator.isGenderValid, jsonObject.gender, "4 (Gender), ") +
                FormValidator.checkData(FormValidator.isPlaceValid, jsonObject.birthPlace, "5 (Birth Place), ") +
                FormValidator.checkData(FormValidator.isDateValid, jsonObject.birthdate, "6 (Birth Date), ");

        } else {
            errorString = "missing fields  "
        }
        return errorString
    }
};

module.exports = FormValidator;



