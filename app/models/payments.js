const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const { v4: uuid } = require('uuid');

const db = new JsonDB(new Config("myDataBase", true, false, '/'));

const create = (data) => {
  console.log({ data });
  const paymentUUID = uuid();
  db.push(`/payments/${paymentUUID}`, data);

  return {
    ...data,
    uuid: paymentUUID,
  }
}

const registerTheEndpoint = (data) => {
  const endpointUUID = uuid();
  db.push(`/endpoints/${endpointUUID}`, data, false);
}

const findEndpoints = () => {
  const endpoints = db.getData('/endpoints');
  console.log({ endpoints });
  return endpoints;
}

const find = () => {
  const payments = db.getData('/payments');
  console.log({ payments });
  return payments;
}

module.exports = { create, find, registerTheEndpoint, findEndpoints }