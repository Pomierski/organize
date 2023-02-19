import config from "../config/config.json";
import { FileExtensions } from "../types/fileExtensions";

export interface Config {
  fileGroups: Array<keyof FileExtensions>;
  fileExtensions: Required<FileExtensions>;
  initialPath: string;
}

export const getConfig = (): Config => {
  const { initialPath } = config;
  const { fileExtensions } = config;
  const fileGroups = Object.keys(fileExtensions) as Array<keyof FileExtensions>;

  return {
    initialPath,
    fileExtensions,
    fileGroups,
  };
};
