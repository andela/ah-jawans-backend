/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swagger from '../swagger.json';
// eslint-disable-next-line import/no-named-as-default
import route from './routes/index';

import './config/passport';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: process.env.SECRET_KEY,
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Authors Haven', });
});


app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(route);

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
