import { existsSync, mkdir } from "fs";
import { displayError, ErrorType } from "../utils/displayError";
import { getConfig } from "./getConfig";

export const createDirByFileExtension = (category: string): void => {
  const { initialPath } = getConfig();
  const categoryPath = `${initialPath}/${category}`;

  if (!existsSync(categoryPath)) {
    return mkdir(categoryPath, (err) => displayError(ErrorType.ReadDir, err));
  }
};
