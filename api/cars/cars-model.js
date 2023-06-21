const db = require("../../data/db-config.js");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id: id }).first();
};

const getByVin = (vin) => {
  return db("cars").where({ vin: vin }).first();
};

const create = (data) => {
  return db("cars")
    .insert(data)
    .then((idx) => ({ id: idx[0], ...data }));
};

module.exports = { getAll, getById, getByVin, create };
