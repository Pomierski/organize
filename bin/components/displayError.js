const { createErrorMessage } = require("./message");

const errorType = {
  onMove: "onMove",
  readDir: "readDir",
  parametr: "parametr",
};

const displayError = (type, err) => {
  switch (type) {
    case "onMove": {
      return createErrorMessage("Error while moving file", err);
    }
    case "readDir": {
      return createErrorMessage("Unable to scan directory", err);
    }
    case "parametr": {
      return createErrorMessage("Error, check if you entered parametr value correctly", err);
    }
    default: {
      return createErrorMessage("Unexpected error", err);
    }
  }
};

module.exports = {
  errorType,
  displayError,
};
