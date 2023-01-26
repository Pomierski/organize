"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createMesssage = exports.createErrorMessage = exports.MessageType = void 0;
var chalk_1 = require("chalk");
var config_json_1 = __importDefault(require("../config/config.json"));
var prefix = config_json_1["default"].prefix;
var MessageType;
(function (MessageType) {
    MessageType["Info"] = "info";
    MessageType["Success"] = "success";
    MessageType["Warning"] = "warning";
    MessageType["Casual"] = "casual";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var createErrorMessage = function (message, err) { return console.log(chalk_1.red.bgBlack.bold("".concat(message, " ").concat(err && ": ".concat(err)))); };
exports.createErrorMessage = createErrorMessage;
var createMesssage = function (message, type) {
    switch (type) {
        case MessageType.Success: {
            return console.log("".concat(prefix, " ").concat(chalk_1.green.bold(message)));
        }
        case MessageType.Info: {
            return console.log("".concat(prefix, " ").concat(chalk_1.yellowBright.bold(message)));
        }
        case MessageType.Warning: {
            return console.log("".concat(prefix, " ").concat((0, chalk_1.red)(message)));
        }
        case MessageType.Casual:
        default: {
            return console.log("".concat(prefix, " ").concat((0, chalk_1.grey)(message)));
        }
    }
};
exports.createMesssage = createMesssage;
