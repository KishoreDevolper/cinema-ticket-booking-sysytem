const dbsetup = require('./db/seeds/db-setup');

const express = require('express');

dbsetup();

const app = express();

app.use(express.urlencoded({extended:true}));


const PORT = 5000;

app.use(express.json());

require('./routes/auth.routes')(app)
require('./routes/goldmorning')(app)
require('./routes/goldafternoon')(app)
require('./routes/goldnight')(app)
require('./routes/silvermorning')(app)
require('./routes/silverafternoon')(app)
require('./routes/silvernight')(app)

app.listen(PORT,console.log(`server looking on the port ${PORT}`));
