import request from 'supertest'
import { app } from '../app'

beforeAll(() => { })

describe('Is the application running correctly?', () => {
    let userMock = { email: 'jest@jest.jest', password: '0123456789' }
    let token: string

    test('GET /', async () => {
        await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.project).toBe('ScriptType - SOLID')
            })
    })

    test('POST /register', async () => {
        await request(app)
            .post('/register')
            .send(userMock)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('token')
                expect(response.body.token).toHaveLength(213)
            })
    })

    test('POST /login', async () => {
        await request(app)
            .post('/login')
            .send(userMock)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('token')
                expect(response.body.token).toHaveLength(213)
                token = response.body.token
            })
    })

    test('DELETE /user/delete', async () => {
        await request(app)
            .delete('/user/delete')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

})