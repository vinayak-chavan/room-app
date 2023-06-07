const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { sendmail } = require('../utils/mail');

const user = require("../models/user");
const { successResponse, errorResponse } = require("../utils");

const login = async (req, res) => {
  try {
    const emailID = req.body.emailID;
    const password = req.body.password;

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse(req, res, "Invalid credentials!", 404);
    }
    
    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      res.render("login");

      // return errorResponse(req, res, 'Invalid credentials!', 404);
    } else {
      // jwt token created
      let accessToken = userData.getToken({
        exp: 60 * 60,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      res.cookie("accessToken", accessToken);
      await userData.save();
      res.redirect('/alladmin');
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong!", 400, {
      err: error,
    });
  }
};

const loginView = async (req, res) => {
  res.render("login");
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.redirect("/login");
  } catch (error) {
    return errorResponse(req, res, "Error while logging out", 500);
  }
};

const addAdminView = async (req, res) => {
  res.render("addAdmins");
};

const viewAllAdmins = async (req, res) => {
  try {
    const userData = await user.find();
    res.render("viewAdmins", { users: userData });
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    let userId = req.params.id;
    const userData = await user.findByIdAndDelete({ _id: userId });
    res.redirect("/alladmin");
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { emailID, password,  username} = new user(req.body);
    // check if email id allready exist
    const userData = await user.findOne({ emailID: emailID });

    if (userData) {
      return errorResponse(req, res, "email id allready exist", 400);
    } else {
      // creating payload
      const payload = {
        username,
        emailID,
        password
      };

      // register new user
      const newUser = new user(payload);
      const insertUser = await newUser.save();

      console.log("new admin added successfully");
      const link = process.env.LINK;
      sendmail(
        emailID,
        "Credentials From Fintrak",
        ` <p> Hello </p><strong> ${username}, </strong> </br>
          <p> You have been successfully added for admin role on Fintrack. Please use the below credentials for sign in.</p>
          <p><b>Email Id: </b> ${emailID}</p>
          <p><b>Password: </b> ${password}</p>
          <p>To access Fintrak <a href="${link}">click here</a></p>
          <p> Thank You!!</p>`
      );

      res.redirect('/alladmin');
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400);
  }
};

module.exports = {
  login,
  logout,
  loginView,
  addAdminView,
  viewAllAdmins,
  deleteAdmin,
  addAdmin,
};
