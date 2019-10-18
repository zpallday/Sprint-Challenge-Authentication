const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('../api/server.js')

describe('jokes router', () => {
    beforeEach(async () => {
    await db('users').truncate();
    });

  

})
