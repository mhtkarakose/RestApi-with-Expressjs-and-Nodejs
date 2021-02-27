const express = require('express');
const config = require('./config/config.js');

const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const methodOverride = require('method-override');
const paginate = require('express-paginate');
const cors = require('cors');
const useragent = require('express-useragent');

const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const appRoutes = require('./routes/app.routes.js');
const authRoutes = require('./routes/auth.routes');


/**
 * MongoDB init
 */
require('./persistence/mongodb/db.js');

/**
 * ExpressJS app init
 */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
});

/**
 * Middleware section
 */
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(useragent.express());
// Logger init
app.use(expressLogger);

app.use(helmet());


/**
 * Router
 */
app.use(config.apiRouteAuth, authRoutes);
app.use(config.apiRouteV1, appRoutes);

app.listen(config.port, () => {
    logger.info('Server running on port %d', config.port);
});
