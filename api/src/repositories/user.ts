import IUser from "../interface/user";
import db from "../db";

export default class UserRepository {
  async create(user: IUser) {
    console.log("uuu", user);
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO user SET ?", user, (error: any, results: any) => {
        if (error) throw error;
        resolve(results);
      });
    });
  }

  async getByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE email = "${email}" LIMIT 1`,
        (error: any, results: any) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async getByUsername(username: string) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE username = "${username}" LIMIT 1`,
        (error: any, results: any) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async updateToken(token: string, email: string) {
    const query = await db.query(
      `UPDATE user SET token = ${token} WHERE email = ${email}`
    );
    console.log(query);
  }
}
