// DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');

// CREATE SERVER
var app = express();
var PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTING
app.use(require('./routes/main'))
app.use(require('./routes/api'))

// RUN SERVER
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log('Server running at http://localhost:' + PORT)
  })
})
