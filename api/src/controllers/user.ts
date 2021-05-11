import UserRepository from "../repositories/user";
import UserValidator from "../validators/user";
import { validate } from "class-validator";
import UserLoginValidator from "../validators/userLogin";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

exports.register = async (req: any, res: any) => {
  console.log('yeak');
  
  const userValid: UserValidator = new UserValidator(
    req.body.email,
    req.body.password,
    req.body.checkPassword,
    req.body.username
    );
    
    console.log('iddddd', process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE)
  const err = await validate(userValid);
  if (err.length > 0) {
    let errors = {};
    err.map((oneError: any) => {
      errors = {
        ...errors,
        [oneError.property]: oneError.constraints![
          Object.keys(oneError.constraints!)[0]
        ],
      };
    });
    return res.status(412).send(errors);
  }
  if (req.body.password !== req.body.checkPassword) {
    return res.status(412).send({
      checkPassword: "Les mots de passe ne correspondent pas",
      password: "Les mots de passe ne correspondent pas",
    });
  }

  try {
    const UserRepo = new UserRepository();
    const response1: any = await UserRepo.getByEmail(req.body.email);
    if (Object.keys(response1).length !== 0) {
      return res
        .status(409)
        .send({ problem: "email", message: "Cet email existe déjà" });
    }
    const response2: any = await UserRepo.getByUsername(req.body.username);
    if (Object.keys(response2).length !== 0) {
      return res
        .status(409)
        .send({ problem: "username", message: "Cet username existe déjà" });
    }

    if (
      Object.keys(response2).length === 0 &&
      Object.keys(response1).length === 0
    ) {
      const hash = await bcrypt.hashSync(req.body.password, 10);

      const dataForm: any = {
        email: req.body.email,
        username: req.body.username,
        password: hash,
      };

      await UserRepo.create(dataForm);
      return res.status(201).send("User created");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (req: any, res: any) => {
  const userValid: UserLoginValidator = new UserLoginValidator(
    req.body.email,
    req.body.password
  );

  const err = await validate(userValid);
  if (err.length > 0) {
    let errors = {};
    err.map((oneError: any) => {
      errors = {
        ...errors,
        [oneError.property]: oneError.constraints![
          Object.keys(oneError.constraints!)[0]
        ],
      };
    });
    res.status(412).send(errors);
  }

  const userRepo: UserRepository = new UserRepository();
  const user: any = await userRepo.getByEmail(req.body.email);
  if (user.length === 0) {
    res.status(401).send("cet email n'existe pas");
  }
  bcrypt.compare(
    req.body.password,
    user[0].password,
    async (err: any, result: any) => {
      if (err) {
        throw new Error(err);
      }
      if (result === false) {
        res.status(401).send("Accès refusé");
      } else {
        const token = jwt.sign({ userId: user[0].rowid }, "private", {
          expiresIn: "24h",
        });

        const addToken: any = await userRepo.updateToken(token, req.body.email);
        if (!addToken) {
          throw new Error("Echec de lajout du token");
        }
        res.status(200).send({ user: user[0].rowid, token });
      }
    }
  );
};

/*
exports.getUserById = async (req: any, res: any) => {
  try {
    const UserRepo: UserRepository = new UserRepository();
    const response: any = await UserRepo.getById(req.params.id);
    console.log("kkk", response);
    if (
      response[0].token !== req.params.token ||
      response[0].token === undefined
    ) {
      res.status(401).send("Le token ne correspond pas");
    }
    res.status(200).send(response);
  } catch (error: any) {
    throw new Error(error);
  }
};*/

exports.getUser = async (req: any, res: any) => {
  /*if( !isEmail(req.params.email )){
    return throw new Error("Ce n'est pas un email");
  }*/

  try {
    const UserRepo: UserRepository = new UserRepository();
    const response = await UserRepo.getByEmail(req.params.email);
    res.status(200).send(response);
  } catch (error: any) {
    throw new Error(error);
  }
};
