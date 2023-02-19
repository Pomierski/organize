import { extname } from "path";

export const capitalize = (str: string): string =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

export const getFileExtension = (fileName: string): string => {
  const fileExtension = extname(fileName);
  return fileExtension.slice(1, fileExtension.length).toLowerCase();
};
