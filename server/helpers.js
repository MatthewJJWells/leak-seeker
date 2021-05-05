const {
  mongooseRegModel,
  mongooseVehicleModel,
} = require('./mongoose-schema.js');

const checkIfVehicleExists = async function (newFaultRecord) {
  return await mongooseVehicleModel.findOne(
    {
      make: newFaultRecord.make,
      model: newFaultRecord.model,
    }
  );
};

const checkIfRegExists = async function (newFaultRecord) {
  return await mongooseRegModel.findOne(
    {
      reg: newFaultRecord.reg,
    }
  );
};

module.exports = {checkIfVehicleExists, checkIfRegExists}
