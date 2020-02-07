import * as jwt from 'jsonwebtoken';
import { knex } from '../../db/knex';
import User from '../models/user';


const TokenAuthentication = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || token === undefined) {
    return res.status(401).json({ status: 'unauthorized'});
  }
  [,token] = token.split(' ');
  if (!token || token === undefined) {
    return res.status(401).json({ status: 'unauthorized'});
  }
  jwt.verify(token, User.JWT_SECRET, { algorithms: ['HS256'] }, async (err, payload) => {
    if (err) {
      return res.status(401).json({ status: 'unauthorized'});
    }
    req.user_id = parseInt(payload.user_id, 10);
    req.username = payload.username;
    req.role_id = parseInt(payload.role.id, 10);
    next();
  });
};

export default TokenAuthentication;
