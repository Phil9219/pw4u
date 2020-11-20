const fs = require("fs").promises;

async function readMasterPassword() {
  return process.env.MASTERPASSWORD;
}
exports.readMasterPassword = readMasterPassword;
