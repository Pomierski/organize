import { FileExtensions } from "../types/fileExtensions";
import { Option } from "../types/options";
import { getConfig } from "./getConfig";

export const handleExtensionOption = (
  option: Option
): FileExtensions | undefined => {
  if (!option) {
    return;
  }
  const { fileGroups, fileExtensions } = getConfig();

  const fileExtension = option.toLowerCase();
  const extensionKey = fileGroups.find((fileGroup) =>
    fileExtensions[fileGroup].includes(fileExtension)
  );

  if (extensionKey) {
    return {
      [extensionKey]: [fileExtension],
    };
  }

  return;
};
