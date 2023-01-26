import { createErrorMessage } from "./message";

export enum ErrorType {
  OnMove = "onMove",
  ReadDir = "readDir",
  Parameter = "parameter",
}

export const displayError = (
  type: ErrorType,
  err?: NodeJS.ErrnoException | null | unknown
): void => {
  switch (type) {
    case ErrorType.OnMove: {
      return createErrorMessage("Error while moving file", err);
    }
    case ErrorType.ReadDir: {
      return createErrorMessage("Unable to scan directory", err);
    }
    case ErrorType.Parameter: {
      return createErrorMessage(
        "Error, check if you entered parameter value correctly",
        err
      );
    }
    default: {
      return createErrorMessage("Unexpected error", err);
    }
  }
};
