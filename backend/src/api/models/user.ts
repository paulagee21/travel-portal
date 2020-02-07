import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { knex } from '../../db/knex';

class User {

  static JWT_EXPIRY: number = parseInt(process.env.JWT_EXPIRATION!, 10) || 86400;
  static JWT_ISSUER: string = process.env.JWT_ISSUER || 'travel-portal';
  static JWT_SECRET: string = process.env.JWT_SECRET || 'secret-secret';
  static EMPLOYEE_ROLE_ID: number = 1;
  static MANAGER_ROLE_ID: number = 2;
  static FINANCE_MANAGER_ROLE_ID: number = 3;

  checkPassword = async (password, password2) => {
    const response = await bcrypt.compare(password, password2);
    if (!response) {
      throw Error('Incorrect password.')
    }
    return true;
  }

  getManagers = async () => {
    return knex.select('users.id', 'username')
      .from('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where({ 'roles.id': User.MANAGER_ROLE_ID });
  } 

  login = async (username, password) => {
    const user = await knex.select(
        'users.id',
        'users.username',
        'users.password',
        'users.role_id',
        'roles.name as role_name',
      )
      .from('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where({ username: username })
      .first();
    
    if (!user) {
      throw Error('Invalid username/password.');
    }

    await this.checkPassword(password, user.password);
    const token = await this.createToken(user);
    const response = {
      username: username,
      role: user.role_id,
      access_token: token,
    }
    return response;
  }

  private createToken = async (data: any) => {
    let body: any;
    try {
      const options = {
        header: {
          algorithm: 'HS256',
          typ: 'JWT',
        },
      };
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + User.JWT_EXPIRY;
      body = {
        user_id: data.id,
        username: data.username,
        role: {
          id: data.role_id,
          name:  data.role_name,
        },
        iss: User.JWT_ISSUER,
        uuid: 1234,
        iat,
        exp,
      };
      const privateKey = User.JWT_SECRET;
      const token = await jwt.sign(body, privateKey, options);
      return token;
    } catch (err) {
      console.log(err.message);
    }
  }

}

export default User;
