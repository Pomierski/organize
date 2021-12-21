const path = require("path");

const capitalize = (string) => string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

const getFileExtension = (file) => {
  const fileExtension = path.extname(file);
  return fileExtension.slice(1, fileExtension.length);
};

module.exports = {
  capitalize,
  getFileExtension,
};
