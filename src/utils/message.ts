import { green, red, yellowBright } from "chalk";
import config from "../config/config.json";

const { prefix } = config;

export enum MessageType {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Casual = "casual",
}

export const createErrorMessage = (
  message: string,
  err?: NodeJS.ErrnoException | null | unknown
): void => console.log(red.bgBlack.bold(`${message} ${err && `: ${err}`}`));

export const displayMesssage = (message: string, type: MessageType): void => {
  switch (type) {
    case MessageType.Success: {
      return console.log(`${prefix} ${green.bold(message)}`);
    }
    case MessageType.Info: {
      return console.log(`${prefix} ${yellowBright.bold(message)}`);
    }
    case MessageType.Warning: {
      return console.log(`${prefix} ${red(message)}`);
    }
    case MessageType.Casual:
    default: {
      return console.log(message);
    }
  }
};
