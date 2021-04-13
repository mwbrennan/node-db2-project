const db = require('../../data/db-config.js');
const { getById } = require('./cars-model.js')

const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const item = getById(req.params.id);

  if(!item) {
    res.status(404).json({ message: `car with ${req.params.id} is not found` })
  } else {
    req.car = item;
    next();
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    res.status(400).json({ message: 'vin is missing' })
  } else if (!make) {
    res.status(400).json({ message: 'make is missing' })
  } else if (!model) {
    res.status(400).json({ message: 'model is missing' })
  } else if (!mileage) {
    res.status(400).json({ message: 'mileage is missing' })
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validVinNumber = vinValidator.validate(req.body.vin);

  if(validVinNumber === false) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  } else {
    next();
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const checked = db('cars').where('vin', req.body.vin.trim());

  if(checked.length > 0) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}