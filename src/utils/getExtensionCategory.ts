import { FileExtensions } from "../types/fileExtensions";
import { capitalize } from "./utils";

export const getExtensionCategory = (
  fileGroups: string[],
  fileExtensions: FileExtensions,
  fileExtension: string
): string | undefined => {
  const category = fileGroups.find((category) =>
    fileExtensions[category as keyof FileExtensions]?.includes(fileExtension)
  );

  if (category) {
    return capitalize(category);
  }
};
