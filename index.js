const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

require("./app/controllers/index")(app);

app.listen(9000, () => {
  console.log("Node-Webhook has been started at: http://localhost:9000");
});