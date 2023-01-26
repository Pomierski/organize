#!/usr/bin/env node

import { existsSync, mkdir, readdir } from "fs";
import { moveSync } from "fs-extra";
import { displayError, ErrorType } from "./components/displayError";
import { createMesssage, MessageType } from "./components/message";
import { program } from "./options";
import config from "./config/config.json";
import { capitalize, getFileExtension } from "./functions";
import { FileExtensions } from "./types/fileExtensions";

const { initialPath } = config;
let { fileExtensions }: FileExtensions = config;
const options = program.opts();
const filesGroup = Object.keys(fileExtensions);

if (options.ignore) {
  if (options.ignore.includes(" ")) {
    const itemsToIgnore = options.ignore
      .split(" ")
      .map((item: string) => capitalize(item));
    filesGroup.forEach((key) => {
      if (itemsToIgnore.includes(key)) delete fileExtensions[key];
    });
  } else if (!options.ignore.includes(" ")) {
    const fileGroup = capitalize(options.ignore);
    if (filesGroup.includes(fileGroup)) {
      delete fileExtensions[fileGroup];
    }
  } else {
    displayError(ErrorType.Parameter);
  }
}

if (options.only) {
  const fileGroup = capitalize(options.only);
  if (fileGroup in fileExtensions) {
    fileExtensions = {
      [fileGroup]: fileExtensions[fileGroup],
    };
  } else {
    displayError(ErrorType.Parameter);
  }
}

if (options.extension) {
  const fileExtension = options.extension.toLowerCase();
  let extensionKey: string | undefined;
  filesGroup.forEach((key) => {
    if (fileExtension[key].includes(fileExtension)) {
      extensionKey = key;
    }
  });

  if (extensionKey) {
    fileExtensions = {
      [extensionKey]: [fileExtension],
    };
  } else {
    displayError(ErrorType.Parameter);
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
    displayError(ErrorType.Parameter);
  }
}

const getExtensionCategory = (fileExtension: string): string | undefined =>
  filesGroup.find((category) =>
    fileExtensions[category].includes(fileExtension)
  );

const createDirByFileExtension = (category: string): void => {
  if (!category) return undefined;
  if (!existsSync(`${initialPath}/${category}`)) {
    return mkdir(`${initialPath}/${category}`, (err) => err);
  }
};

const moveFile = (
  file: string,
  fileExtension: string,
  onMoveCallback: () => void
): void => {
  const category = getExtensionCategory(fileExtension);
  if (!category) return undefined;

  createDirByFileExtension(category);

  if (!existsSync(`${initialPath}/${category}/${file}`)) {
    try {
      moveSync(`${initialPath}/${file}`, `${initialPath}/${category}/${file}`);
    } catch (err: unknown) {
      displayError(ErrorType.OnMove, err);
    }
    onMoveCallback();
    return createMesssage(
      `Moving ${file} into ${category}/${file}`,
      MessageType.Casual
    );
  }
  if (existsSync(`${initialPath}/${category}/${file}`)) {
    return createMesssage(
      `${file} already exist in ${category} directory, skipping...`,
      MessageType.Warning
    );
  }
};

const organizeFiles = (): void => {
  let movedFiles = 0;
  readdir(initialPath, (err, files) => {
    if (err) {
      return displayError(ErrorType.ReadDir, err);
    }
    files.forEach((file, index) => {
      moveFile(file, getFileExtension(file), () => {
        movedFiles += 1;
      });
      if (!movedFiles && index === files.length - 1) {
        return createMesssage(
          `No files found to be organized\n`,
          MessageType.Info
        );
      }
      if (index === files.length - 1) {
        return createMesssage(
          `Organized ${movedFiles} files\n`,
          MessageType.Success
        );
      }
    });
  });
};

organizeFiles();
