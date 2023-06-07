const mongoose = require('mongoose');

require('./src/db/connection');
const user = require('./src/models/user');

const seedAdmin = [{
  "username":"Demo Admin",
  "emailID":"admin@gmail.com",
  "password":"$2a$10$ky1Mc/8/wTZQeqUkz6pKeetefPku0e/JiFtMHD2Vf.312S5U5QqpG",
}];

const seedDB = async () => {
  await user.insertMany(seedAdmin);
  console.log('Seeding process completed!!')
};

seedDB().then(() => {
  mongoose.connection.close();
});