const { readCommandLineArguments } = require("./lib/commandLine");
const { close, connect } = require("./lib/database");
const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");

async function run() {
  await connect(
    "mongodb+srv://phil:rceTBvhDn9suKXY8@cluster0.umnb6.mongodb.net/PasswordSaver?retryWrites=true&w=majority",
    "PasswordSaver"
  );
  console.log("connect to db");

  const masterPassword = await askForMasterPassword();

  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error("You are not welcome here! 👿 Try again!");
    return run();
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.error("Missing password name!");
    return process.exit(9);
  }

  if (passwordName === "delete") {
    const passwordToDelete = newPasswordValue;
    await deletePassword(passwordToDelete);
    console.log("Password is deleted.");
  } else if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const passwordValue = await getPassword(passwordName);
    console.log(`Your password is ${passwordValue} 🎉`);
  }
  close();
}

run();
