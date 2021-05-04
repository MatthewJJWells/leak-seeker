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

    const vehicleRecord = await mongooseVehicleModel.findOne(
      {
        make: regToVehicle.make,
        model: regToVehicle.model,
      }
    );

    res.status(200).send(vehicleRecord);
  } catch (error) {
    console.error('Failed to get document from database, error -> ', error);
  }
};

// Add fault post request
// ToDo -> add responses with interpolation to advise what has been done
const addFault = async function (req, res) {
  const vehicleData = req.body;
  let vehicleExists = false;

  // If vehicle make & model exists, add new faults to existing record
  if (await checkIfVehicleExists(vehicleData)) {
    vehicleExists = true;
    const record = await checkIfVehicleExists(vehicleData);
    record.faults.push(...vehicleData.faults);
    await record.save();
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
  // If vehicle fault record doesnt exist, create it
  if (vehicleExists === false) {
    const faultRecord = new mongooseVehicleModel({
      make: vehicleData.make,
      model: vehicleData.model,
      faults: vehicleData.faults,
    });
    await faultRecord.save();
  }
  res.status(200).end();
};

module.exports = {
  getFunction,
  getFaultsFromReg,
  addFault
};
