const chalk = require("chalk");
const config = require("../config/config.json");

const { prefix } = config;

const messageType = {
  info: "info",
  success: "success",
  warning: "warning",
};

const createErrorMessage = (message, err) => console.log(chalk.red.bgBlack.bold(
  `${message} ${err && `: ${err}`}`,
));

const createMesssage = (message, type) => {
  switch (type) {
    case "success": {
      return console.log(`${prefix} ${chalk.green.bold(message)}`);
    }
    case "info": {
      return console.log(`${prefix} ${chalk.yellowBright.bold(message)}`);
    }
    case "warning": {
      return console.log(`${prefix} ${chalk.red(message)}`);
    }
    default: {
      return console.log(`${prefix} ${chalk.grey(message)}`);
    }
  }
};

module.exports = {
  messageType,
  createErrorMessage,
  createMesssage,
};
