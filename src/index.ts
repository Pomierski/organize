#!/usr/bin/env node

import { getConfig } from "./core/getConfig";
import { handleCustomOption } from "./core/handleCustomOption";
import { handleExtensionOption } from "./core/handleExtensionOption";
import { handleIgnoreOption } from "./core/handleIgnoreOption";
import { handleOnlyOption } from "./core/handleOnlyOption";
import { organizeFiles } from "./core/organizeFiles";
import { program } from "./options";

const { fileGroups: defaultFileGroups, fileExtensions: defaultFileExtensions } =
  getConfig();
const options = program.opts();

if (options.ignore) {
  const fileExtensions = handleIgnoreOption(options.ignore);
  if (fileExtensions) {
    organizeFiles(defaultFileGroups, fileExtensions);
  }
}

if (options.only) {
  const fileExtensions = handleOnlyOption(options.only);
  if (fileExtensions) {
    organizeFiles(defaultFileGroups, fileExtensions);
  }
}

if (options.extension) {
  const fileExtensions = handleExtensionOption(options.extension);
  if (fileExtensions) {
    organizeFiles(defaultFileGroups, fileExtensions);
  }
}

if (options.custom) {
  const customOption = handleCustomOption(options.custom);
  if (customOption) {
    const { fileGroups, fileExtensions } = customOption;

    organizeFiles(fileGroups, fileExtensions);
  }
}

organizeFiles(defaultFileGroups, defaultFileExtensions);
