// DO YOUR MAGIC

const router = require('express').Router();
const { getAll, getById, create } = require('./cars-model.js');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js');


// DO YOUR MAGIC

// return cars
router.get('/', (req, res, next) => {
    getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            next(err);
        })
})

// return specific id
router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
})


// post car
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    create(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(err => {
            next(err);
        })
})

module.exports = router;