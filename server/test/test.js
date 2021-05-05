/* eslint-disable */
const assert = require('assert');
const request = require('supertest');
const app = require('../index');

const { mongooseRegModel, mongooseVehicleModel } = require('../mongoose-schema');
const { checkIfVehicleExists, checkIfRegExists } = require('../helpers');

/*
endpoints and matching functions
POST /addfault -> addFault()
GET /search/:reg -> getFaultsFormReg()
GET /getallfaults -> getFunction()

helper functions
checkIfVehicleExists()
checkIfRegExists()
*/

async function resetTestDatabase () {
  await mongooseRegModel.deleteMany({}, () => {});
  await mongooseVehicleModel.deleteMany({}, () => {});
}

const mockData = [
  {
    reg: 'reg1',
    make: 'make1',
    model: 'model1',
    faults: [
      {
        summary: 'summary1',
        description: 'description1',
        year: 1,
        area: 'area1',
        priceToFix: 1,
        faultLogged: new Date(),
        rating: 1
      }
    ]
  },
  {
    reg: 'reg2',
    make: 'make2',
    model: 'model2',
    faults: [
      {
        summary: 'summary2',
        description: 'description2',
        year: 2,
        area: 'area2',
        priceToFix: 2,
        faultLogged: new Date(),
        rating: 2
      }
    ]
  }
];

describe('/getallfaults GET endpoint', () => {
  it('Get data when database is empty', async () => {
    const response = await request(app).get('/getallfaults');
    assert.strictEqual(response.statusCode, 200);
    const data = JSON.parse(response.text);
    assert.strictEqual(data.length, 0);
  });

  it('Get data when database is populated', async () => {
    await request(app)
      .post('/addfault')
      .send(mockData[0]);
    await request(app)
      .post('/addfault')
      .send(mockData[1]);

    const response = await request(app).get('/getallfaults');
    assert.strictEqual(response.statusCode, 200);
    const data = JSON.parse(response.text);
    assert.strictEqual(data[0].make, mockData[0].make);
    assert.strictEqual(data[0].model, mockData[0].model);
    assert.strictEqual(data[0].faults[0].summary, mockData[0].faults[0].summary);
    assert.strictEqual(data[1].make, mockData[1].make);
    assert.strictEqual(data[1].model, mockData[1].model);
    assert.strictEqual(data[1].faults[0].summary, mockData[1].faults[0].summary);
  });

  afterEach(resetTestDatabase);
});

describe('/addfault POST endpoint', () => {
  it('Post new data', async () => {
    const response1 = await request(app)
      .post('/addfault')
      .send(mockData[0]);
    assert.strictEqual(response1.statusCode, 200);
    const response2 = await request(app)
      .post('/addfault')
      .send(mockData[1]);
    assert.strictEqual(response2.statusCode, 200);

    const response3 = await request(app).get('/getallfaults');
    const data = JSON.parse(response3.text);
    assert.strictEqual(data[0].make, mockData[0].make);
    assert.strictEqual(data[0].model, mockData[0].model);
    assert.strictEqual(data[0].faults[0].summary, mockData[0].faults[0].summary);
    assert.strictEqual(data[1].make, mockData[1].make);
    assert.strictEqual(data[1].model, mockData[1].model);
    assert.strictEqual(data[1].faults[0].summary, mockData[1].faults[0].summary);
  });

  it('Post new data to an already tracked vehicle', async () => {//!
    const response1 = await request(app)
      .post('/addfault')
      .send(mockData[0]);
    assert.strictEqual(response1.statusCode, 200);
    const response2 = await request(app)
      .post('/addfault')
      .send(mockData[0]);
    assert.strictEqual(response2.statusCode, 200);

    const response3 = await request(app).get('/getallfaults');
    const data = JSON.parse(response3.text);
    assert.strictEqual(data[0].make, mockData[0].make);
    assert.strictEqual(data[0].model, mockData[0].model);
    assert.strictEqual(data[0].faults[0].summary, mockData[0].faults[0].summary);
    assert.strictEqual(data[0].faults[1].summary, mockData[0].faults[0].summary);
  });

  it('Respond with 400 status code on bad request', async () => {
    const response1 = await request(app)
      .post('/addfault')
      .send({ data: 'invalid' });
    assert.strictEqual(response1.statusCode, 400);
    const response2 = await request(app).get('/getallfaults');
    const data = JSON.parse(response2.text);
    assert.strictEqual(data.length, 0);
  });

  afterEach(resetTestDatabase);
});

describe('/search/:reg GET endpoint', () => {
  it('Get searched data', async () => {
    await request(app)
      .post('/addfault')
      .send(mockData[0]);
    await request(app)
      .post('/addfault')
      .send(mockData[1]);
    const response = await request(app).get(`/search/${mockData[0].reg}`);
    assert.strictEqual(response.statusCode, 200);
    const data = JSON.parse(response.text);
    assert.strictEqual(data.make, mockData[0].make);
    assert.strictEqual(data.model, mockData[0].model);
    assert.strictEqual(data.faults[0].summary, mockData[0].faults[0].summary);
  });

  it('Respond with 400 status code on bad request', async () => {
    const response = await request(app).get(`/search/badrequest`);
    assert.strictEqual(response.statusCode, 400);
    await request(app)
      .post('/addfault')
      .send(mockData[0]);
    const response2 = await request(app).get(`/search/badrequest`);
    assert.strictEqual(response2.statusCode, 400);
  });

  afterEach(resetTestDatabase);
});

describe('checkIfVehicleExists() function', () => {
  it('Return null if vehicle does not exist', async () => {
    const response = await checkIfVehicleExists(mockData[0]);
    assert.strictEqual(response, null);
  });

  it('Return data if vehicle does exist', async () => {
    await request(app)
      .post('/addfault')
      .send(mockData[0]);

    const data = await checkIfVehicleExists(mockData[0]);
    assert.strictEqual(data.make, mockData[0].make);
    assert.strictEqual(data.model, mockData[0].model);
    assert.strictEqual(data.faults[0].summary, mockData[0].faults[0].summary);
  });

  afterEach(resetTestDatabase);
});

describe('checkIfRegExists() function', async () => {
  it('Return null if registration does not exist', async () => {
    const response = await checkIfRegExists(mockData[0]);
    assert.strictEqual(response, null);
  });

  it('Return data if registration does exist', async () => {
    await request(app)
      .post('/addfault')
      .send(mockData[0]);

    const data = await checkIfRegExists(mockData[0]);
    assert.strictEqual(data.reg, mockData[0].reg);
    assert.strictEqual(data.make, mockData[0].make);
    assert.strictEqual(data.model, mockData[0].model);
  });

  afterEach(resetTestDatabase);
});
