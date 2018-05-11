const express = require('express');
// const router = express.Router();

const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const m = multer(); // for parsing multipart/form-data

const app = express();
const port = 8999;

const checkAuth = require('./core/controllers/checkAuth')

app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// router.all('*', checkAuth)
app.use('/api', checkAuth)
app.use(/^\/secure/, checkAuth)

require('./core/routes.js')(app, m);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
