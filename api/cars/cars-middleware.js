const { getById, getByVin } = require("./cars-model.js");
const { object, string, number } = require("yup");
const vinValidator = require("vin-validator");

let userSchema = object({
  vin: string().required(),
  make: string().required(),
  model: string().required(),
  mileage: number().required(),
  title: string().required(),
  transmission: string().required(),
});

const checkCarId = async (req, res, next) => {
  try {
    let query = await getById(req.params.id);
    if (query) {
      req.data = query;
      next();
    } else {
      next({ status: 404, message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    }
  } catch (e) {
    next(e);
  }
};

const checkCarPayload = async (req, res, next) => {
  try {
    try {
      await userSchema.validate(req.body);
      next();
    } catch (e) {
      next({ status: 400, message: `${e.path} is missing` });
    }
  } catch (e) {
    next(e);
  }
};

const checkVinNumberValid = (req, res, next) => {
  let validate = vinValidator.validate(req.body.vin);
  if (validate) {
    next();
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let query = await getByVin(req.body.vin);
    query ? next({ status: 400, message: `vin ${req.body.vin} already exists` }) : next();
  } catch (e) {
    next(e);
  }
};

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique };
