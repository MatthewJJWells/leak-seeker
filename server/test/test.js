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
