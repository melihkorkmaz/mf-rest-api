import mongoose from 'mongoose';

import { warn, info } from './dna.logger';
import config from '../config';

const connectionString = process.env.DB_CONN || config.database.conn;
const connectionTargetAuthDB = process.env.DB_AUTH || config.database.auth_db;


const connectDatabase = () => {
  mongoose.connect(connectionString, {
    auth: {
      authdb: connectionTargetAuthDB,
    },
    server: {
      socketOptions: {
        socketTimeoutMS: 0,
        connectTimeout: 0,
      },
    },
  });
};

export function initDatabase() {
  connectDatabase();

  const db = mongoose.connection;

  db.on('connected', () => {
    info('Mongoose has been connected!');
  });

  db.on('disconnected', () => {
    warn('Mongoose has been disconnected!');
    connectDatabase();
  });
}
