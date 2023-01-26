"use strict";
exports.__esModule = true;
exports.getFileExtension = exports.capitalize = void 0;
var path_1 = require("path");
var capitalize = function (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalize = capitalize;
var getFileExtension = function (fileName) {
    var fileExtension = (0, path_1.extname)(fileName);
    return fileExtension.slice(1, fileExtension.length).toLowerCase();
};
exports.getFileExtension = getFileExtension;
