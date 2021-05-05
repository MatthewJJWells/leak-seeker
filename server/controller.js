const { mongooseRegModel, mongooseVehicleModel } = require('./mongoose-schema.js');
const { checkIfVehicleExists, checkIfRegExists } = require('./helpers');

// Get all vehicle records request
const getFunction = async function (req, res) {
  try {
    const allDocs = await mongooseVehicleModel.find((err, docs) => {
      return docs;
    });
    res.status(200).send(allDocs);
  } catch (error) {
    console.error('Failed to get document from database, error -> ', error);
  }
};

// Get specific vehcile records from reg request
const getFaultsFromReg = async function (req, res) {
  try {
    const regToVehicle = await mongooseRegModel.findOne(
      { reg: req.params.reg },
      );
    
    if (regToVehicle === null) res.status(400).end();
    else {
      const vehicleRecord = await mongooseVehicleModel.findOne(
        {
          make: regToVehicle.make,
          model: regToVehicle.model,
        }
      );
      res.status(200).send(vehicleRecord);
    }

  } catch (error) {
    console.error('Failed to get document from database, error -> ', error);
  }
};

// Add fault post request
const addFault = async function (req, res) {
  const vehicleData = req.body;
  if (!validateVehicleData(vehicleData)) res.status(400).end();
  // If vehicle data exists in the database add new faults to existing record otherwise create a new record
  const record = await checkIfVehicleExists(vehicleData);
  if (record) {
    record.faults.push(...vehicleData.faults);
    await record.save();
  } else {
    const faultRecord = new mongooseVehicleModel({
      make: vehicleData.make,
      model: vehicleData.model,
      faults: vehicleData.faults,
    });
    await faultRecord.save();
  }

  // If reg doesnt exist in db, add reg + make/ model to mock api collection db
  if (!(await checkIfRegExists(vehicleData))) {
    const regRecord = new mongooseRegModel({
      reg: vehicleData.reg,
      make: vehicleData.make,
      model: vehicleData.model,
    });
    await regRecord.save();
  }

  res.status(200).end();
};

const validateVehicleData = function (data) {
  if ('make' in data && 'model' in data && 'faults' in data) return true
  return false;
};

module.exports = {
  getFunction,
  getFaultsFromReg,
  addFault
};
