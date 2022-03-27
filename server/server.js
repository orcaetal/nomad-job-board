//Hello, please take a moment to view the README

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());                           /* allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');
require('./routes/job.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

