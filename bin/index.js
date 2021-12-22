#!/usr/bin/env node

const fs = require("fs");
const fse = require("fs-extra");
const { displayError, errorType } = require("./components/displayError");
const { createMesssage, messageType } = require("./components/message");
const options = require("./options").opts();
const config = require("./config/config.json");
const { capitalize, getFileExtension } = require("./functions");

const { initialPath } = config;
let { fileExtensions } = config;

const filesGroup = Object.keys(fileExtensions);

if (options.ignore) {
  if (options.ignore.includes(" ")) {
    const itemsToIgnore = options.ignore
      .split(" ")
      .map((item) => capitalize(item));
    filesGroup.forEach((key) => {
      if (itemsToIgnore.includes(key)) delete fileExtensions[key];
    });
  } else if (!options.ignore.includes(" ")) {
    const fileGroup = capitalize(options.ignore);
    if (filesGroup.includes(fileGroup)) {
      delete fileExtensions[fileGroup];
    }
  } else {
    displayError(errorType.parametr);
  }
}

if (options.only) {
  const fileGroup = capitalize(options.only);
  if (fileGroup in fileExtensions) {
    fileExtensions = {
      [fileGroup]: fileExtensions[fileGroup],
    };
  } else {
    displayError(errorType.parametr);
  }
}

if (options.extension) {
  const fileExtension = options.extension.toLowerCase();
  let extensionKey;
  filesGroup.forEach((key) => {
    if (fileExtensions[key].includes(fileExtension)) {
      extensionKey = key;
    }
  });

  if (extensionKey) {
    fileExtensions = {
      [extensionKey]: [fileExtension],
    };
  } else {
    displayError(errorType.parametr);
  }
}

if (options.custom) {
  const params = options.custom.replace(/\s/g, "").split(",");
  if (params.length === 2) {
    const groupName = params[0];
    const fileExtension = params[1];
    fileExtensions = {
      [groupName]: fileExtension,
    };
  } else {
    displayError(errorType.parametr);
  }
}

const getExtensionCategory = (fileExtension) => filesGroup.find(
  (category) => fileExtensions[category].includes(fileExtension),
);

const createDirByFileExtension = (category) => {
  if (!category) return undefined;
  if (!fs.existsSync(`${initialPath}/${category}`)) {
    return fs.mkdir(`${initialPath}/${category}`, (err) => err);
  }
};

const moveFile = (file, fileExtension, onMoveCallback) => {
  const category = getExtensionCategory(fileExtension);
  if (!category) return undefined;

  createDirByFileExtension(category);

  if (!fs.existsSync(`${initialPath}/${category}/${file}`)) {
    fse.moveSync(
      `${initialPath}/${file}`,
      `${initialPath}/${category}/${file}`,
      (err) => displayError(errorType.onMove, err),
    );
    onMoveCallback();
    return createMesssage(`Moving ${file} into ${category}/${file}`);
  } if (fs.existsSync(`${initialPath}/${category}/${file}`)) {
    return createMesssage(`${file} already exist in ${category} directory, skipping...`, messageType.warning);
  }
};

const organizeFiles = () => {
  let movedFiles = 0;
  fs.readdir(initialPath, (err, files) => {
    if (err) {
      return displayError(errorType.readDir, err);
    }
    files.forEach((file, index) => {
      moveFile(file, getFileExtension(file), () => { movedFiles += 1; });
      if (!movedFiles && index === files.length - 1) {
        return createMesssage(`No files found to be organized\n`, messageType.info);
      }
      if (index === files.length - 1) {
        return createMesssage(`Organized ${movedFiles} files\n`, messageType.success);
      }
    });
  });
};

organizeFiles();
