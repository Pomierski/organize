"use strict";
exports.__esModule = true;
exports.displayError = exports.ErrorType = void 0;
var message_1 = require("./message");
var ErrorType;
(function (ErrorType) {
    ErrorType["OnMove"] = "onMove";
    ErrorType["ReadDir"] = "readDir";
    ErrorType["Parameter"] = "parameter";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var displayError = function (type, err) {
    switch (type) {
        case ErrorType.OnMove: {
            return (0, message_1.createErrorMessage)("Error while moving file", err);
        }
        case ErrorType.ReadDir: {
            return (0, message_1.createErrorMessage)("Unable to scan directory", err);
        }
        case ErrorType.Parameter: {
            return (0, message_1.createErrorMessage)("Error, check if you entered parametr value correctly", err);
        }
        default: {
            return (0, message_1.createErrorMessage)("Unexpected error", err);
        }
    }
};
exports.displayError = displayError;
