import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swagger from '../swagger.json';
import route from './routes/index';


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Authors Haven',
  });
});

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(route);

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
