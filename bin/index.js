#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
exports.__esModule = true;
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
var displayError_1 = require("./components/displayError");
var message_1 = require("./components/message");
var options_1 = require("./options");
var config_json_1 = __importDefault(require("./config/config.json"));
var functions_1 = require("./functions");
var initialPath = config_json_1["default"].initialPath;
var fileExtensions = config_json_1["default"].fileExtensions;
var options = options_1.program.opts();
var filesGroup = Object.keys(fileExtensions);
if (options.ignore) {
    if (options.ignore.includes(" ")) {
        var itemsToIgnore_1 = options.ignore
            .split(" ")
            .map(function (item) { return (0, functions_1.capitalize)(item); });
        filesGroup.forEach(function (key) {
            if (itemsToIgnore_1.includes(key))
                delete fileExtensions[key];
        });
    }
    else if (!options.ignore.includes(" ")) {
        var fileGroup = (0, functions_1.capitalize)(options.ignore);
        if (filesGroup.includes(fileGroup)) {
            delete fileExtensions[fileGroup];
        }
    }
    else {
        (0, displayError_1.displayError)(displayError_1.ErrorType.Parameter);
    }
}
if (options.only) {
    var fileGroup = (0, functions_1.capitalize)(options.only);
    if (fileGroup in fileExtensions) {
        fileExtensions = (_a = {},
            _a[fileGroup] = fileExtensions[fileGroup],
            _a);
    }
    else {
        (0, displayError_1.displayError)(displayError_1.ErrorType.Parameter);
    }
}
if (options.extension) {
    var fileExtension_1 = options.extension.toLowerCase();
    var extensionKey_1;
    filesGroup.forEach(function (key) {
        var _a;
        if ((_a = Object.keys(fileExtension_1)
            .find(function (k) { return k === key; })) === null || _a === void 0 ? void 0 : _a.includes(fileExtension_1)) {
            extensionKey_1 = key;
        }
    });
    if (extensionKey_1) {
        fileExtensions = (_b = {},
            _b[extensionKey_1] = [fileExtension_1],
            _b);
    }
    else {
        (0, displayError_1.displayError)(displayError_1.ErrorType.Parameter);
    }
}
if (options.custom) {
    var params = options.custom.replace(/\s/g, "").split(",");
    if (params.length === 2) {
        var groupName = params[0];
        var fileExtension = params[1];
        fileExtensions = (_c = {},
            _c[groupName] = fileExtension,
            _c);
    }
    else {
        (0, displayError_1.displayError)(displayError_1.ErrorType.Parameter);
    }
}
var getExtensionCategory = function (fileExtension) {
    return filesGroup.find(function (category) {
        return fileExtensions[category].includes(fileExtension);
    });
};
var createDirByFileExtension = function (category) {
    if (!category)
        return undefined;
    if (!(0, fs_1.existsSync)("".concat(initialPath, "/").concat(category))) {
        return (0, fs_1.mkdir)("".concat(initialPath, "/").concat(category), function (err) { return err; });
    }
};
var moveFile = function (file, fileExtension, onMoveCallback) {
    var category = getExtensionCategory(fileExtension);
    if (!category)
        return undefined;
    createDirByFileExtension(category);
    if (!(0, fs_1.existsSync)("".concat(initialPath, "/").concat(category, "/").concat(file))) {
        try {
            (0, fs_extra_1.moveSync)("".concat(initialPath, "/").concat(file), "".concat(initialPath, "/").concat(category, "/").concat(file));
            onMoveCallback();
            return (0, message_1.createMesssage)("Moving ".concat(file, " into ").concat(category, "/").concat(file), message_1.MessageType.Casual);
        }
        catch (err) {
            (0, displayError_1.displayError)(displayError_1.ErrorType.OnMove, err);
        }
    }
    if ((0, fs_1.existsSync)("".concat(initialPath, "/").concat(category, "/").concat(file))) {
        return (0, message_1.createMesssage)("".concat(file, " already exist in ").concat(category, " directory, skipping..."), message_1.MessageType.Warning);
    }
};
var organizeFiles = function () {
    var movedFiles = 0;
    (0, fs_1.readdir)(initialPath, function (err, files) {
        if (err) {
            return (0, displayError_1.displayError)(displayError_1.ErrorType.ReadDir, err);
        }
        files.forEach(function (file, index) {
            moveFile(file, (0, functions_1.getFileExtension)(file), function () {
                movedFiles += 1;
            });
            if (!movedFiles && index === files.length - 1) {
                return (0, message_1.createMesssage)("No files found to be organized\n", message_1.MessageType.Info);
            }
            if (index === files.length - 1) {
                return (0, message_1.createMesssage)("Organized ".concat(movedFiles, " files\n"), message_1.MessageType.Success);
            }
        });
    });
};
organizeFiles();
