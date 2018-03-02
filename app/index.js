/** import libraries */
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

/** import custom libraris */
import { appRoutes } from './routes';
import { info } from './utils/dna.logger';
import { authMiddleware } from './utils/auth.middleware';
import { initFirebase } from './utils/firebase.helper';
import { initDatabase } from './utils/mongoose.helper';

/** init database for mongoDV */
initDatabase();

/** init firabase for notify tablets */
initFirebase();

/** express application */
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node-api/v1/*', authMiddleware);
appRoutes(app);

const port = process.env.SERVER_PORT || 8101;
app.listen(8101, () => { info(`Server is running on ${port}!`); });
