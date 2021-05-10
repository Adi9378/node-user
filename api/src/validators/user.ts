import { Length, IsString, IsEmail, IsPostalCode } from "class-validator";
export default class UserValidator {
  constructor(
    email: string,
    password: string,
    checkPassword: string,
    username: string
  ) {
    this.email = email;
    this.password = password;
    this.checkPassword = checkPassword;
    this.username = username;
  }

  @IsEmail()
  email: string;

  @Length(8, 25)
  @IsString()
  password: string;

  @Length(8, 25)
  @IsString()
  checkPassword: string;

  @Length(4, 25)
  @IsString()
  username: string;
}
