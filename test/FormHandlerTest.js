const FormHandler = require('./../public/javascripts/FormHandler.js')

var message = "1) Greta\n" +
    "2)\n" +
    "3) Thunberg \n" +
    "4) F\n" +
    "5) Stockholm, Sweden \n" +
    "6) 2003-01-03\n" +
    "7) Malena Ernman\n" +
    "8) Svante Thunberg \n" +
    "9) 2003-04-01 \n" +
    "10) 2003-04-01";

console.log(FormHandler.validateForm({'phoneNumber' : "1277070302703", 'message' :message}));

message = "1)NDZUD";

console.log(FormHandler.validateForm({'phoneNumber' : "1277070302703", 'message' :message}));

message = "1) Greta\n" +
    "2)\n" +
    "3) Thunber33g \n" +
    "4) F\n" +
    "5) Stockholm, Sweden \n" +
    "6) 2003-01-03\n" +
    "7) Malena Ernman\n" +
    "8) Svante Thunberg \n" +
    "9) 2003-04-01 \n" +
    "10) 2003-04-01";

console.log(FormHandler.validateForm({'phoneNumber' : "1277070302703", 'message' :message}));

message = "";

console.log(FormHandler.validateForm({'phoneNumber' : "1277070302703", 'message' :message}));