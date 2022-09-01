/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//routes
const authRoutes = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

// all middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
const acl = require('./acl');
const { getAuthMiddleware, getAccessMiddleware } = require('u-server-utils');


const expressSwagger = require('express-swagger-generator')(app);
const validate = require('./util/authValidator');

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', 1728000);
  next();
});


const options = {
  swaggerDefinition: {
    info: {
      description: 'Auth Information Server ',
      title: 'User Information Server',
      version: '1.0.0',
    },
    host: 'localhost:7000',
    produces: ['application/json'],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT auth token',
      },
    },
  },
  // eslint-disable-next-line no-undef
  basedir: __dirname,
  files: ['./routes/**/*.js'], // Path to the API handle folder
};

expressSwagger(options);
// app.use(getAccessMiddleware(acl));

app.use('/auth', authRoutes);
app.use('/user', getAuthMiddleware(validate), userRouter);


module.exports = app;
