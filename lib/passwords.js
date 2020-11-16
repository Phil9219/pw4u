const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function readPasswordSafe(name) {
  const password = await collection("passwords").findOne({ name });

  return password;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(passwordName) {
  const password = await readPasswordSafe(passwordName);

  const passwordBytes = CryptoJS.AES.decrypt(
    password.value,
    await readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  const filter = { name: passwordName };
  const update = { $set: { value: encryptedValue } };
  await collection("passwords").updateOne(filter, update, {
    upsert: true,
  });
}

async function deletePassword(passwordName) {
  const filter = { name: passwordName };
  await collection("passwords").deleteOne(filter);
}

exports.deletePassword = deletePassword;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
