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
