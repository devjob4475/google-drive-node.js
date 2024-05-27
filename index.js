const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/index');

const PORT = 8080;

app.use(morgan('dev'));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
