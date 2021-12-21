#!/usr/bin/env node

const fs = require("fs");
const fse = require("fs-extra");
const chalk = require("chalk");
const options = require("./options").opts();
const config = require("./config/config.json");
const { capitalize, getFileExtension } = require("./functions");

const { initialPath, prefix } = config;

let fileExtensionsObj = config.fileExtensions;
let error = false;
const filesGroup = Object.keys(fileExtensionsObj);

const displayParametrError = () => {
  error = true;
  return console.log(
    chalk.red.bgBlack.bold(
      "Error, check if you entered parametr value correctly",
    ),
  );
};

const createDirByFileExtension = (file, fileExtension, counterFn) => {
  Object.keys(fileExtensionsObj).forEach((ext) => {
    if (fileExtensionsObj[ext].includes(fileExtension.toLowerCase())) {
      if (!fs.existsSync(`${initialPath}/${ext}`)) {
        fs.mkdir(`${initialPath}/${ext}`, (err) => err);
      }
      if (!fs.existsSync(`${initialPath}/${ext}/${file}`)) {
        fse.moveSync(
          `${initialPath}/${file}`,
          `${initialPath}/${ext}/${file}`,
          (err) => err,
        );
        counterFn();
        return console.log(
          `${prefix} ${chalk.grey(`Moving ${file} into ${ext}/${file}`)}`,
        );
      } if (fs.existsSync(`${initialPath}/${ext}/${file}`)) {
        return console.log(
          `${prefix} ${chalk.red(
            `${file} already exist in ${ext} directory, skipping...`,
          )}`,
        );
      }
    }
    return undefined;
  });
};

if (options.ignore) {
  if (options.ignore.includes(" ")) {
    const itemsToIgnore = options.ignore
      .split(" ")
      .map((item) => capitalize(item));
    filesGroup.forEach((key) => {
      if (itemsToIgnore.includes(key)) delete fileExtensionsObj[key];
    });
  } else if (!options.ignore.includes(" ")) {
    const fileGroup = capitalize(options.ignore);
    if (filesGroup.includes(fileGroup)) {
      delete fileExtensionsObj[fileGroup];
    }
  } else {
    displayParametrError();
  }
}

if (options.only) {
  const fileGroup = capitalize(options.only);
  if (fileGroup in fileExtensionsObj) {
    fileExtensionsObj = {
      [fileGroup]: fileExtensionsObj[fileGroup],
    };
  } else {
    displayParametrError();
  }
}

if (options.extension) {
  const fileExtension = options.extension.toLowerCase();
  let extensionKey;
  filesGroup.forEach((key) => {
    if (fileExtensionsObj[key].includes(fileExtension)) {
      extensionKey = key;
    }
  });

  if (extensionKey) {
    fileExtensionsObj = {
      [extensionKey]: [fileExtension],
    };
  } else {
    displayParametrError();
  }
}

if (options.custom) {
  const params = options.custom.replace(/\s/g, "").split(",");
  if (params.length === 2) {
    const groupName = params[0];
    const fileExtension = params[1];
    fileExtensionsObj = {
      [groupName]: fileExtension,
    };
  } else {
    displayParametrError();
  }
}

const organizeFiles = () => {
  fs.readdir(initialPath, (err, files) => {
    if (err) {
      return console.log(`${chalk.red("Unable to scan directory: ")} ${err}`);
    }
    let filesProcessed = 0;
    let filesMoved = 0;
    const countFiles = () => {
      filesMoved += 1;
    };
    files.forEach((file) => {
      createDirByFileExtension(file, getFileExtension(file), countFiles);
      filesProcessed += 1;
      if (filesProcessed === files.length) {
        if (filesMoved === 0) {
          return console.log(`${prefix} ${chalk.yellowBright.bold(
            `No files found to be organized\n`,
          )}`);
        }
        if (filesMoved !== 0) {
          return console.log(`${prefix} ${chalk.green.bold(
            `Organized ${filesMoved} files\n`,
          )}`);
        }
      }
      return undefined;
    });
    return undefined;
  });
};

const startProgram = async () => {
  if (!error) organizeFiles();
};

startProgram();
