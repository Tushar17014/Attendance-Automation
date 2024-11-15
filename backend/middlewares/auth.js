const express = require('express');
const { getUser } = require('../services/auth');
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const token = req.header('authorization')?.replace('Bearer', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    console.log(token);
    try {
        const decoded = jwt.verify(token, "MySecret");
        console.log(decoded);
        // req.userID = decoded.id;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: err.message });
    }
}


module.exports = isAuthenticated;
