import { join } from "path";
import { Command } from "commander";
import { green, magentaBright } from "chalk";
import { fileExtensions } from "../config/config.json";

const pkg = JSON.parse(`${join("../../package.json")}`);

export const program = new Command();

program.version(pkg.version).description(
  `${green("Organize")} your files \n${magentaBright(
    "[Categories]"
  )}: ${Object.keys(fileExtensions).join(", ")}
      `
);
program.option(
  "-i, --ignore [category or categories]",
  `Ignore files from one or many categories, e.g ${magentaBright.italic(
    "organize -i 'videos'"
  )} or ${magentaBright.italic("organize -i 'videos, movies, music'")}`
);
program.option(
  "-o, --only [files group]",
  `Organize by only one category, e.g ${magentaBright.italic(
    "organize -o 'videos'"
  )}`
);
program.option(
  "-e, --extension [file extension]",
  `Organize files with specified extension, e.g ${magentaBright.italic(
    "organize -e 'webm'"
  )}`
);
program.option(
  "-c, --custom [new category, file extension]",
  `Organize files with extension which categories don't contain, e.g ${magentaBright.italic(
    "organize -e 'Javascript, js'"
  )}`
);

program.parse(process.argv);
