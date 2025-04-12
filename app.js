const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
require('dotenv').config();

const app = express();
const { PORT = 3001 } = process.env;
const { errors } = require( 'celebrate' );

const mainRouter = require( './routes/index' );
const errorHandler = require( './middleware/error-handler' );
const { requestLogger, errorLogger } = require( './middleware/loggers.js' );

mongoose
	.connect( 'mongodb://127.0.0.1:27017/wtwr_db' )
	.then(() => {
		console.log( 'Connected to DB' );
	})
	.catch( console.error );

app.use( cors() );
app.use( express.json() );

app.use( requestLogger );

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use( '/', mainRouter );

app.use( errorLogger );

app.use( errors() );
app.use( errorHandler );

app.listen( PORT, () => {
	console.log( `Listening on port ${ PORT }...` );
});
