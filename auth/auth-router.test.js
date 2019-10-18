const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('../api/server.js')

describe('auth router', () => {
    beforeEach(async () => {
    await db('users').truncate();
    });
    describe('POST /api/auth/register', () => {
        it('returns status 201', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({username: 'Jane', password: 'grapefruit'})
                .then(res => {
                    expect(res.status).toBe(201)
                });
        });
        it('inserts new user into db', async () => {
            const [id] = await db('users').insert({username: 'John', password: 'banana'});
            let newUser = await db('users')
                .where({id})
                .first();
            expect(newUser.username).toBe('John')
        });
  
        it('returns a token on successful login', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({username: 'John', password: 'banana'});
            return request(server)
                .post('/api/auth/login')
                .send({username: 'John', password: 'banana'})
            .then(res => expect(res.body.token).toBeString)
    })
    })
})