const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
mongoose.connect(process.env.DB_CONNECTION, 
{
 useNewUrlParser: true,
 useUnifiedTopology: true
},
()=>console.log("app is connected to mongoDB")
);


//imports routes
const queriesRoute = require('./routes/query-route.js');
app.use('/api', queriesRoute);



const port = process.env.PORT || 4000;

app.listen(port, ()=>console.log(`listening on ${port}`));
