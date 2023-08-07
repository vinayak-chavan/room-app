const mongoose = require('mongoose');

let url = "mongodb+srv://hallschedulingppg:hallschedulingppg@cluster0.gfrbv1m.mongodb.net/";
// let url = "mongodb://localhost:27017/room-booking-app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// let url = 'mongodb+srv://room:room@cluster0.xyk4vms.mongodb.net/';

(async () => {
  try {
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(`connection error ${e}`);
  }
})();

const db = mongoose.connection;

db.once("open", async () => {
  console.log(`✔ Successfully connected to mongodb database`);
});
db.on("error", () => {
  console.log(`connection error while connection at ${URL}`);
});
