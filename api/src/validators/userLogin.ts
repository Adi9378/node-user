import { Length, IsString } from "class-validator";
export default class UserLoginValidator {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  @IsString()
  login: string;

  @Length(8, 25)
  @IsString()
  password: string;
}
