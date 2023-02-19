import { FileExtensions } from "../types/fileExtensions";
import { Option } from "../types/options";
import { displayError, ErrorType } from "../utils/displayError";
import { getConfig } from "./getConfig";

export const handleOnlyOption = (
  option: Option
): FileExtensions | undefined => {
  const { fileExtensions } = getConfig();

  if (!option) {
    return;
  }

  const fileGroup = option.toLowerCase();

  if (fileGroup in fileExtensions) {
    const updatedFileExtensions: FileExtensions = {
      [fileGroup]: fileExtensions[fileGroup as keyof FileExtensions],
    };

    return updatedFileExtensions;
  }

  displayError(ErrorType.Parameter);
  return;
};
