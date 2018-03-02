import Logdna from 'logdna';

const options = {
  app: 'menufield-api',
};

options.index_meta = true;
const logger = Logdna.setupDefaultLogger('7d001f6b2be84f2885381444582cccc0', options);

export function info(message) { return process.env.NODE_ENV === 'production' ? logger.info(message) : null; }
export function warn(message) { return process.env.NODE_ENV === 'production' ? logger.warn(message) : null; }
export function error(message) { return process.env.NODE_ENV === 'production' ? logger.error(message) : null; }
export function fatal(message) { return process.env.NODE_ENV === 'production' ? logger.fatal(message) : null; }
