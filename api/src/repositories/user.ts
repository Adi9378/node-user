import IUser from "../interface/user";
import db from '../db';

export default class UserRepository {

  async create(user: IUser) {
    const query = await db.query("INSERT INTO user SET ?", user, (error: any, results: any) => {
      if(error) throw error;
    });
    console.log(query);
  }

  async getByEmail(email: string) {
    const query = await db.query(`SELECT * FROM user WHERE email = "${email}" LIMIT 1`);
    console.log(query);
  }

  async getByUsername(username: string) {
    const query = await db.query(`SELECT * FROM user WHERE username = "${username}" LIMIT 1`);
    console.log(query);
  }

  async updateToken(token: string, email: string) {
    const query = await db.query(`UPDATE user SET token = ${token} WHERE email = ${email}`);
    console.log(query);
  }
}
