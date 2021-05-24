require('dotenv').config();
const mongoose = require('./model.js');

const vehCollection = process.env.VEHICLECOLLECTION;
const regCollection = process.env.REGCOLLECTION;

// Fault record schema
const vehicleData = new mongoose.Schema({
  make: {
    type: 'String',
    required: true,
  },
  model: {
    type: 'String',
    required: true,
  },
  faults: [{
    summary: {
      type: 'String',
    },
    description: {
      type: 'String',
    },
    year: {
      type: 'Number',
    },
    area: {
      type: 'String',
    },
    priceToFix: {
      type: 'Number',
    },
    faultLogged: {
      type: 'Date',
    },
    rating: {
      type: 'Number',
    },
  }]
});

// API mock reg search result schema
const regToModel = new mongoose.Schema({
  reg: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
});

const mongooseRegModel = mongoose.model(regCollection, regToModel);
const mongooseVehicleModel = mongoose.model(vehCollection, vehicleData);

module.exports = { mongooseRegModel, mongooseVehicleModel };
