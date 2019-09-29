var Constants = require('./../utils/Constants.js');
var FormValidator = require('./FormValidator.js');

const FormHandler = {
    parseForm(smsObject) {
    var parsingSMS = {};
    var i = 0;
    var splitSMS = smsObject.message.split('/');
    splitSMS.forEach(field => {
        var splitField = field.split(")");
        if (splitField.length === 2) {
            parsingSMS[Constants.CERTIFICATE_ARRAY[i]] = splitField[1].trim();
            i++;
        }
    });
    parsingSMS.phoneNumber = smsObject.phoneNumber;
    return parsingSMS;
    },

    validateForm(smsObject) {
        var parsingSMS = FormHandler.parseForm(smsObject);

        var errorMessage = FormValidator.checkAllData(parsingSMS);

        if (errorMessage === "") {
            return {'message': parsingSMS, 'code': Constants.HTTPCode.SUCCESS};
        } else {
            return {
                'message': "Error(s) were spotted : " + errorMessage.substring(0, errorMessage.length - 2) ,
                'code': Constants.HTTPCode.BAD_REQUEST
            };
            // "are" can be replace by "is" in certain case
        }
    },

    validateForm2(smsObject) {
        var parsingSMS = FormHandler.parseForm(smsObject);

        var errorMessage = FormValidator.checkAllData2(parsingSMS);

        if (errorMessage === "") {
            return {'message': parsingSMS, 'code': Constants.HTTPCode.SUCCESS};
        } else {
            return {
                'message': "Error(s) were spotted : " + errorMessage.substring(0, errorMessage.length - 2) ,
                'code': Constants.HTTPCode.BAD_REQUEST
            };
            // "are" can be replace by "is" in certain case
        }
    }

};

module.exports = FormHandler;

