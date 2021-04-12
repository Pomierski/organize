#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const chalk = require("chalk");
const pkg = require(path.join(__dirname, "../package.json"));
const { Command, option } = require("commander");
const program = new Command();

let fileExtensionsObj = require("./fileExtensions.json");

const initialPath = "./";
const prefix = "\n[Organize]:";
let error = false;

const capitalize = (string) =>
  string.slice(0, 1).toUpperCase() +
  string.slice(1, string.length).toLowerCase();

const displayParametrError = () => {
  error = true;
  return console.log(
    chalk.red.bgBlack.bold(
      "Error, check if you entered parametr value correctly"
    )
  );
};

const getFileExtension = (file) => {
  let fileExtension = path.extname(file);
  return fileExtension.slice(1, fileExtension.length);
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
          (err) => err
        );
        counterFn();
        return console.log(
          `${prefix} ${chalk.grey(`Moving ${file} into ${ext}/${file}`)}`
        );
      } else if (fs.existsSync(`${initialPath}/${ext}/${file}`)) {
        return console.log(
          `${prefix} ${chalk.red(
            `${file} already exist in ${ext} directory, skipping...`
          )}`
        );
      }
    }
  });
};

program.version(pkg.version).description(
  `${chalk.green("Organize")} your files \n${chalk.magentaBright(
    "[Categories]"
  )}: ${Object.keys(fileExtensionsObj).join(", ")}
    `
);

program.option(
  "-i, --ignore [category or categories]",
  `Ignore files from one or many categories, e.g ${chalk.magentaBright.italic(
    "organize -i 'videos'"
  )} or ${chalk.magentaBright.italic("organize -i 'videos, movies, music'")}`
);
program.option(
  "-o, --only [files group]",
  `Organize by only one category, e.g ${chalk.magentaBright.italic(
    "organize -o 'videos'"
  )}`
);
program.option(
  "-e, --extension [file extension]",
  `Organize files with specified extension, e.g ${chalk.magentaBright.italic(
    "organize -e 'webm'"
  )}`
);
program.option(
  "-c, --custom [new category, file extension]",
  `Organize files with extension which categories don't contain, e.g ${chalk.magentaBright.italic(
    "organize -e 'Javascript, js'"
  )}`
);
program.parse(process.argv);

const options = program.opts();

if (options.ignore) {
  filesGroup = Object.keys(fileExtensionsObj);
  if (options.ignore.includes(" ")) {
    itemsToIgnore = options.ignore.split(" ");
    itemsToIgnore.forEach((item) => (item = capitalize(item)));
    filesGroup.forEach((key) => {
      if (itemsToIgnore.includes(key)) delete fileExtensionsObj[key];
    });
  } else if (!options.ignore.includes(" ")) {
    fileGroup = capitalize(options.ignore);
    if (filesGroup.includes(fileGroup)) {
      delete fileExtensionsObj[fileGroup];
    }
  } else {
    displayParametrError();
  }
}

if (options.only) {
  fileGroup = capitalize(options.only);
  if (fileGroup in fileExtensionsObj) {
    fileExtensionsObj = {
      [fileGroup]: fileExtensionsObj[fileGroup],
    };
  } else {
    displayParametrError();
  }
}

if (options.extension) {
  fileExtension = options.extension.toLowerCase();
  filesGroup = Object.keys(fileExtensionsObj);
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
  if (params.length == 2) {
    const groupName = params[0];
    const fileExtension = params[1];
    fileExtensionsObj = {
      [groupName]: fileExtension,
    };
  } else {
    displayParametrError();
  }
}

const organizeFiles = async () => {
  console.log(`${prefix} ${chalk.yellowBright("Organizing files...")}`);
  return new Promise((resolve, reject) => {
    fs.readdir(initialPath, (err, files) => {
      if (err) {
        reject(`${chalk.red("Unable to scan directory: ")} ${err}`);
      }
      let filesProcessed = 0;
      let filesMoved = 0;
      const countFiles = () => {
        filesMoved++;
      };
      files.forEach((file) => {
        createDirByFileExtension(file, getFileExtension(file), countFiles);
        filesProcessed++;
        if (filesProcessed === files.length) {
          if (filesMoved === 0) {
            resolve(
              `${prefix} ${chalk.yellowBright.bold(
                `No files found to be organized\n`
              )}`
            );
          } else if (filesMoved != 0) {
            resolve(
              `${prefix} ${chalk.green.bold(`Organized ${filesMoved} files\n`)}`
            );
          }
        }
      });
    });
  });
};

const startProgram = async () => {
  if (!error) await organizeFiles().then((res) => console.log(res));
};

startProgram();
