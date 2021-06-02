import UserRepository from "../repositories/user";
import UserValidator from "../validators/user";
import { Request, Response } from "express";
import { isEmail, isNumberString, validate } from "class-validator";
import UserLoginValidator from "../validators/userLogin";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req: Request, res: Response) => {
  const userValid: UserValidator = new UserValidator(
    req.body.email,
    req.body.password,
    req.body.checkPassword,
    req.body.username
  );

  const err = await validate(userValid);
  if (err.length > 0) {
    let errors = {};
    err.map((oneError: any) => {
      errors = {
        ...errors,
        [oneError.property]:
          oneError.constraints![Object.keys(oneError.constraints!)[0]],
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
    if (response1.length !== 0) {
      return res
        .status(409)
        .send({ problem: "email", message: "Cet email existe déjà" });
    }
    const response2: any = await UserRepo.getByUsername(req.body.username);
    if (response2.length !== 0) {
      return res
        .status(409)
        .send({ problem: "username", message: "Cet username existe déjà" });
    }

    if (response2.length === 0 && response1.length === 0) {
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

exports.login = async (req: Request, res: Response) => {
  const userValid: UserLoginValidator = new UserLoginValidator(
    req.body.login,
    req.body.password
  );

  const err = await validate(userValid);
  if (err.length > 0) {
    let errors = {};
    err.map((oneError: any) => {
      errors = {
        ...errors,
        [oneError.property]:
          oneError.constraints![Object.keys(oneError.constraints!)[0]],
      };
    });
    res.status(412).send(errors);
  }

  const userRepo: UserRepository = new UserRepository();
  const user: any = await userRepo.getUserByLogin(req.body.login);
  if (user.length === 0) {
    res.status(401).send("Utilisateur inexistant");
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
        const token = jwt.sign({ userId: user[0].id }, process.env.JWTKEY, {
          expiresIn: "24h",
        });

        res.status(200).send({ user: user[0].id, token });
      }
    }
  );
};

exports.getUserById = async (req: Request, res: Response) => {
  if (!isNumberString(req.params.id)) {
    throw new Error("Id Invalid");
  }
  try {
    const UserRepo: UserRepository = new UserRepository();
    const response: any = await UserRepo.getById(parseInt(req.params.id, 10));
    res.status(200).send(response[0]);
  } catch (error: any) {
    throw new Error(error);
  }
};
