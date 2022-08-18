const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { request } = require('express');

module.exports = {

async createUser(request, response) {
    try {
        
    } catch (error) {
        response.status(400).send("erreur de catch")
    }
}
};