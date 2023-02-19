import { FileExtensions } from "../types/fileExtensions";
import { Option } from "../types/options";
import { getConfig } from "./getConfig";

export const handleIgnoreOption = (
  option: Option
): FileExtensions | undefined => {
  if (!option) {
    return;
  }

  const { fileGroups, fileExtensions } = getConfig();

  const itemsToIgnore = option.includes(" ")
    ? option.split(" ").map((item: string) => item.toLowerCase())
    : [option];

  const updatedFileExtensions = Object.fromEntries(
    fileGroups
      .filter((fileGroup) => !itemsToIgnore.includes(fileGroup))
      .map((fileGroup) => [fileGroup, fileExtensions[fileGroup]])
  );

  return updatedFileExtensions;
};
