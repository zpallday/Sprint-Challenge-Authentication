const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch(error => {
    res.status(500).json({message: 'There was a problem registering'})
  })
});

router.post('/login', (req, res) => {
  let { username, password} = req.body;
  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({token});
    } else {
      res.status(401).json({ error: error, message: "please provide the valid credentialsthere was a problem logging in the user"})
    }
  })
  .catch(error => {
    res.status(500).json({ error: error, message: 'there was a problem logging in the user'})
  })
});

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
