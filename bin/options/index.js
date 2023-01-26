"use strict";
exports.__esModule = true;
exports.program = void 0;
var path_1 = require("path");
var commander_1 = require("commander");
var chalk_1 = require("chalk");
var config_json_1 = require("../config/config.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var pkg = require("".concat((0, path_1.join)(__dirname, "../../package.json")));
exports.program = new commander_1.Command();
exports.program.version(pkg.version).description("".concat((0, chalk_1.green)("Organize"), " your files \n").concat((0, chalk_1.magentaBright)("[Categories]"), ": ").concat(Object.keys(config_json_1.fileExtensions).join(", "), "\n      "));
exports.program.option("-i, --ignore [category or categories]", "Ignore files from one or many categories, e.g ".concat(chalk_1.magentaBright.italic("organize -i 'videos'"), " or ").concat(chalk_1.magentaBright.italic("organize -i 'videos, movies, music'")));
exports.program.option("-o, --only [files group]", "Organize by only one category, e.g ".concat(chalk_1.magentaBright.italic("organize -o 'videos'")));
exports.program.option("-e, --extension [file extension]", "Organize files with specified extension, e.g ".concat(chalk_1.magentaBright.italic("organize -e 'webm'")));
exports.program.option("-c, --custom [new category, file extension]", "Organize files with extension which categories don't contain, e.g ".concat(chalk_1.magentaBright.italic("organize -e 'Javascript, js'")));
exports.program.parse(process.argv);
