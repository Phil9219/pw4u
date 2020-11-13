const { MongoClient } = require("mongodb");

let client;
let db;
async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);

  //   const cursor = db.collection("passwords").find({});
  //   function iterateFunc(doc) {
  //     console.log(JSON.stringify(doc, null, 4));
  //   }

  //   function errorFunc(error) {
  //     console.log(error);
  //   }

  //   cursor.forEach(iterateFunc, errorFunc);
}

function close() {
  return client.close();
}

function collection(name) {
  return db.collection(name);
}

exports.connect = connect;
exports.close = close;
exports.collection = collection;
