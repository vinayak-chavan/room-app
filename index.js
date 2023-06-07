require('./src/db/connection');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');

const userRoutes = require('./src/routes/user');
const roomRoutes = require('./src/routes/room');
const bookingRoutes = require('./src/routes/booking');

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', roomRoutes);
app.use('/', bookingRoutes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});