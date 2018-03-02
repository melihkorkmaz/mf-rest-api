import Jwt from 'jsonwebtoken';
import Config from '../config';
import { warn } from './dna.logger';

const checkToken = (req, res, next) => {
  const tokenModel = {
    token: req.headers['x-access-token'],
    tokenSource: req.headers['x-source'] || 'admin-app',
  };
  if (tokenModel.token) {
    Jwt.verify(tokenModel.token, tokenModel.tokenSource === 'admin-app' ? Config.secret : Config.authSecret, (err, decoded) => {
      if (err) {
        warn(err);
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
      }

      req.user = tokenModel.tokenSource === 'admin-app' ? { _id: '59b687a77a43e741f3770147', restaurantId: '58b207f15138672ad0f3b84d' } : decoded;
      next();
    });
  } else {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
};

export function authMiddleware(req, res, next) {
  switch (req.baseUrl) {
    case '/api/v1/auth/sign-in':
      next();
      return;
    case '/node-api/v1/auth/sign-in':
      next();
      return;
    case '/node-api/v1/restaurants/init':
      next();
      return;
    default:
      checkToken(req, res, next);
      break;
  }
}
