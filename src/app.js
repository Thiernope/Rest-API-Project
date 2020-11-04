const mongoose = require('mongoose');
const express = require('express');
const app = express();
const DB = require('./database/config.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
mongoose.connect(process.env.DB_CONNECTION, 
{
 useNewUrlParser: true,
 useUnifiedTopology: true
},
()=>console.log("app is connected to mongoDB")
);

//import authentication
//const authentication = require('./middleware/authenticate.js'); 
//imports routes
const queriesRoute = require('./routes/query-route.js');
app.use('/api',queriesRoute);

const blogsRoute = require('./routes/blogs-route.js');
app.use('/api', blogsRoute);

const registerUser = require('./routes/user-route.js');
app.use('/api', registerUser);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`listening on ${port}`));
  