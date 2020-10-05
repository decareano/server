const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app');

const fixtures = require('./fixtures');

describe('CRUD Stickers', () => {
	before((done) => {

		knex.migrate.latest()
			.then(() => {
				return knex.seed.run();
			}).then(() => done());
	});

	it('Lists all Records', (done) => {
		request(app)
			.get('/api/v1/stickers')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('array');
				console.log(response.body);
				expect(response.body).to.deep.equal(fixtures.stickers);
				console.log(response.body);
				done();
			});
	});

	it('Show a record by id', (done) => {
		request(app)
			.get('/api/v1/stickers/1')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				console.log(response.body);
				expect(response.body).to.deep.equal(fixtures.stickers[0]);
				console.log(response.body);
				done();
			});
	});

	it('Show a record by id', (done) => {
		request(app)
			.get('/api/v1/stickers/5')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				console.log(response.body);
				expect(response.body).to.deep.equal(fixtures.stickers[4]);
				console.log(response.body);
				done();
			});
	});

	it('it creates a record', (done) => {
		request(app)
			.post('/api/v1/stickers')
			.send(fixtures.sticker)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				fixtures.sticker.id = response.body.id;
				expect(response.body).to.deep.equal(fixtures.sticker);
				console.log(response.body)
				done();
			});
	});
});