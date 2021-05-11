import IUser from "../interface/user";
import db from '../db';

export default class UserRepository {

  async create(user: IUser) {
    
    console.log('uuu', user)
    db.connect();
    const query = await db.query("INSERT INTO user SET ?", user, (error: any, results: any) => {
      console.log(error, results)
      if(error) throw error;
    });
  }
  
  async getByEmail(email: string) {
    
    db.connect(async (err: any) => {
      if(err) console.log(err)
      db.query(`SELECT * FROM user WHERE email = "${email}" LIMIT 1`, (error: any, result: any) => {
        console.log('kkk', error, result)
      });
    });
  }

  async getByUsername(username: string) {
    db.connect(function(err: any) {
      if(err) console.log(err)
      const query = db.query(`SELECT * FROM user WHERE username = "${username}" LIMIT 1`);
      console.log(query);
    });
  }

  async updateToken(token: string, email: string) {
    const query = await db.query(`UPDATE user SET token = ${token} WHERE email = ${email}`);
    console.log(query);
  }
}
