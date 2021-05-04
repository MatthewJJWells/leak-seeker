const { mongooseRegModel, mongooseVehicleModel } = require('./mongoose-schema.js');

// CHECK-IF-DATA-EXISTS HELPER FUNCTIONS
const { checkIfVehicleExists, checkIfRegExists } = require('./helpers');

// GET ALL VEHICLE RECORDS REQUEST
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

// GET SPECIFIC VEHCILE RECORDS FROM REG REQUEST
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

// ADD FAULT POST REQUEST
// TO-DO -> ADD RESPONSES WITH INTERPOLATION TO ADVISE WHAT HAS BEEN DONE
const addFault = async function (req, res) {
  let requestBody = req.body;
  let veh = false;

  // IF VEHICLE MAKE & MODEL EXISTS, ADD NEW FAULTS TO EXISTING RECORD
  if (await checkIfVehicleExists(requestBody)) {
    veh = true;
    let record = await checkIfVehicleExists(requestBody);
    record.faults.push(...requestBody.faults);
    await record.save();
  }

  // IF REG DOESNT EXIST IN DB, ADD REG + MAKE/ MODEL TO MOCK API COLLECTION DB
  if (!(await checkIfRegExists(requestBody))) {
    const regRecord = new mongooseRegModel({
      reg: requestBody.reg,
      make: requestBody.make,
      model: requestBody.model,
    });
    await regRecord.save();
  }
  // IF VEHICLE FAULT RECORD DOESNT EXIST, CREATE IT
  if (veh === false) {
    const faultRecord = new mongooseVehicleModel({
      make: requestBody.make,
      model: requestBody.model,
      faults: requestBody.faults,
    });
    await faultRecord.save();
    res.status(200).send(`Saved POST request to database`);
  }
};

module.exports = {
  getFunction,
  getFaultsFromReg,
  addFault
};
