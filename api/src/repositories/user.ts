import IUser from "../interface/user";
import db from "../db";

export default class UserRepository {
  async create(user: IUser) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO user SET ?",
        user,
        (error: Error, results: Response) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async getByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE email = "${email}" LIMIT 1`,
        (error: Error, results: Response) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async getById(id: number) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE id = "${id}" LIMIT 1`,
        (error: Error, results: Response) => {
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
        (error: Error, results: Response) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async updateToken(token: string, email: string) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE user SET token = '${token}' WHERE email = '${email}'`,
        (error: Error, results: Response) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  async getUserByLogin(login: string) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE email = "${login}" OR username = "${login}" LIMIT 1`,
        (error: Error, results: Response) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
