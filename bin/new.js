const fs = require("fs");
const fse = require("fs-extra");
const chalk = require("chalk");
const options = require("./options").opts();
const config = require("./config/config.json");
const { capitalize, getFileExtension, fileExtensions } = require("./functions");

const { initialPath, prefix } = config;

const error = false;
const filesGroup = Object.keys(fileExtensions);

const displayError = (type) => {
  switch (type) {
    case "parametr": {
      return console.log(
        chalk.red.bgBlack.bold(
          "Error, check if you entered parametr value correctly",
        ),
      );
    }
    default: {
      return console.log(
        `${prefix} ${chalk.red(`Unexpected error`)}`,
      );
    }
  }
};

const getExtensionCategory = (fileExtension) => filesGroup.map(
  (category) => (fileExtensions[category].find(fileExtension) ? category : null),
);

const createDirByFileExtension = (category) => {
  if (!category) return undefined;
  if (!fs.existsSync(`${initialPath}/${category}`)) {
    return fs.mkdir(`${initialPath}/${category}`, (err) => err);
  }
  displayError();
  return undefined;
};

const moveFile = (file, fileExtension) => {
  const category = getExtensionCategory(fileExtension);
  if (!category) return undefined;

  createDirByFileExtension(category);

  if (!fs.existsSync(`${initialPath}/${category}/${file}`)) {
    fse.moveSync(
      `${initialPath}/${file}`,
      `${initialPath}/${category}/${file}`,
      (err) => err,
    );
    return console.log(
      `${prefix} ${chalk.grey(`Moving ${file} into ${category}/${file}`)}`,
    );
  } if (fs.existsSync(`${initialPath}/${category}/${file}`)) {
    return console.log(
      `${prefix} ${chalk.red(
        `${file} already exist in ${category} directory, skipping...`,
      )}`,
    );
  }
  displayError();
  return undefined;
};

const organizeFiles = () => {
  fs.readdir(initialPath, (err, files) => {
    if (err) {
      return console.log(`${chalk.red("Unable to scan directory: ")} ${err}`);
    }
    files.forEach((file, index) => {
      moveFile(file, getFileExtension(file));
      if (files.length === 0) {
        return console.log(`${prefix} ${chalk.yellowBright.bold(
          `No files found to be organized\n`,
        )}`);
      }
      if (index === files.length - 1) {
        return console.log(`${prefix} ${chalk.green.bold(
          `Organized ${index} files\n`,
        )}`);
      }
    });
    return undefined;
  });
};
