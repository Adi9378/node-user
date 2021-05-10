import { Length, IsEmail, IsString } from "class-validator";
export default class UserLoginValidator {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsEmail()
  email: string;

  @Length(8, 25)
  @IsString()
  password: string;
}
