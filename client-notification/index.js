const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post('/webhook-client', async(req, res) => {
    console.log('Inside Callback hook', req.body, req.headers.host )
    return res.status(200).end();
});

app.listen(8005, () => {
    console.log("Client has been stated at: http://localhost:8005");
})

app.listen(8006, () => {
  console.log("Client has been stated at: http://localhost:8006");
})