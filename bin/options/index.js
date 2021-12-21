const path = require("path");
const { Command } = require("commander");
const chalk = require("chalk");
const config = require("../config/config.json");

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(`${path.join(__dirname, '../../package.json')}`);

const program = new Command();

program.version(pkg.version).description(
  `${chalk.green("Organize")} your files \n${chalk.magentaBright(
    "[Categories]",
  )}: ${Object.keys(config.fileExtensions).join(", ")}
      `,
);
program.option(
  "-i, --ignore [category or categories]",
  `Ignore files from one or many categories, e.g ${chalk.magentaBright.italic(
    "organize -i 'videos'",
  )} or ${chalk.magentaBright.italic("organize -i 'videos, movies, music'")}`,
);
program.option(
  "-o, --only [files group]",
  `Organize by only one category, e.g ${chalk.magentaBright.italic(
    "organize -o 'videos'",
  )}`,
);
program.option(
  "-e, --extension [file extension]",
  `Organize files with specified extension, e.g ${chalk.magentaBright.italic(
    "organize -e 'webm'",
  )}`,
);
program.option(
  "-c, --custom [new category, file extension]",
  `Organize files with extension which categories don't contain, e.g ${chalk.magentaBright.italic(
    "organize -e 'Javascript, js'",
  )}`,
);

program.parse(process.argv);

module.exports = program;
