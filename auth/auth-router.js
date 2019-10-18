const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
