import { existsSync } from "fs";
import { moveSync } from "fs-extra";
import { displayError, ErrorType } from "../utils/displayError";
import { displayMesssage, MessageType } from "../utils/message";
import { createDirByFileExtension } from "./createDirByFileExtension";
import { getConfig } from "./getConfig";

export const moveFile = (
  file: string,
  category: string | undefined,
  onMoveCallback: () => void
): void => {
  if (!category) return undefined;

  const { initialPath } = getConfig();

  const targetFilePath = `${initialPath}/${category}/${file}`;
  const filePath = `${initialPath}/${file}`;

  createDirByFileExtension(category);

  if (!existsSync(targetFilePath)) {
    try {
      moveSync(filePath, targetFilePath);
    } catch (err: unknown) {
      displayError(ErrorType.OnMove, err);
    }
    onMoveCallback();
    return displayMesssage(
      `Moving ${file} into ${category}/${file}`,
      MessageType.Casual
    );
  }

  if (existsSync(targetFilePath)) {
    return displayMesssage(
      `${file} already exist in ${category} directory, skipping...`,
      MessageType.Warning
    );
  }
};
