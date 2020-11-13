const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function readPasswordSafe(name) {
  // client = await MongoClient.connect(url, { useUnifiedTopology: true });
  // db = client.db(dbName);

  const password = await collection("passwords").findOne({ name });

  return password;

  // const cursor = db.collection("passwords").find({});
  // function iterateFunc(doc) {
  //   console.log(JSON.stringify(doc, null, 4));
  // }
  // function errorFunc(error) {
  //       console.log(error);
  //     }

  //     cursor.forEach(iterateFunc, errorFunc);
  //   }
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
  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
