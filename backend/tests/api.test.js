const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
    describe('POST /api/profile', () => {
        it('should create a profile with valid inputs', async () => {
            const response = await request(app)
                .post('/api/profile')
                .send({
                    name: 'John Doe',
                    age: 30,
                    gender: 'Male',
                    location: 'New York',
                    interests: 'Music, Sports',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Profile created successfully.');
        });

        it('should return error for missing fields', async () => {
            const response = await request(app)
                .post('/api/profile')
                .send({ name: 'John Doe' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('All fields are required.');
        });
    });

    describe('POST /api/login', () => {
        it('should log in successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ username: 'user1', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful.');
        });

        it('should return error for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ username: 'user1', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid credentials.');
        });

        it('should return error for missing fields', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ username: '' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Username and password are required.');
        });
    });
});
