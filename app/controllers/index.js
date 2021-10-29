const express = require('express');
const Payment = require('../models/payments');
const webhooks = require('node-webhooks');

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const payments = Payment.find({});
    res.send({ data: payments });
  }
  catch (err) {
    return res.status(400).send({ error: err, message: "Payment list failed" }); 
  }
});

router.post("/", (req, res) => {
  try {
    console.log(req.body);
    const payment = Payment.create(req.body);
    if (payment) {
      const hooks = registerWebhooks();
      hooks.trigger('callback_hook', { msg: "new payment created", data: payment });
    }
    res.send({ data: payment });
  }
  catch (err) {
    return res.status(400).send({ error: err, message: "Payment creation failed" }); 
  }
});

router.post('/register-endpoint', (req, res) => {
  const { endpoint } = req.body;
  Payment.registerTheEndpoint(endpoint);
  return res.status(200).end();
});

const registerWebhooks = () => {
  const endpoints = [...new Set(Object.values(Payment.findEndpoints()))].map(endpoint => `${endpoint}/webhook-client`);
  console.log({endpoints})
  return new webhooks({
    db: {
      'callback_hook': endpoints
    }
  });
}

module.exports = (app) => app.use('/payments', router);