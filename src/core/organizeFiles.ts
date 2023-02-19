import { readdir } from "fs";
import { FileExtensions } from "../types/fileExtensions";
import { displayError, ErrorType } from "../utils/displayError";
import { getExtensionCategory } from "../utils/getExtensionCategory";
import { displayMesssage, MessageType } from "../utils/message";
import { getFileExtension } from "../utils/utils";
import { getConfig } from "./getConfig";
import { moveFile } from "./moveFile";

export const organizeFiles = (
  fileGroups: string[],
  fileExtensions: FileExtensions
): void => {
  const { initialPath } = getConfig();
  let movedFiles = 0;

  readdir(initialPath, (err, files) => {
    if (err) {
      return displayError(ErrorType.ReadDir, err);
    }
    files.forEach((file, index) => {
      const fileExtension = getFileExtension(file);
      if (!fileExtension) {
        return;
      }
      const category = getExtensionCategory(
        fileGroups,
        fileExtensions,
        fileExtension
      );

      moveFile(file, category, () => {
        movedFiles += 1;
      });

      if (movedFiles === 0 && index === files.length - 1) {
        displayMesssage(`No files found to be organized\n`, MessageType.Info);

        return process.exit();
      }
      if (index === files.length - 1) {
        displayMesssage(`Organized ${movedFiles} files\n`, MessageType.Success);

        return process.exit();
      }
    });
  });
};
