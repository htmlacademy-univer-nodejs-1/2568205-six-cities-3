import { IsEmail, IsString } from "class-validator";
import { CreateLoginUserMessage } from "./create_login_user_message.dto.js";

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginUserMessage.email.invalidFormat })
  public email!: string;

  @IsString({ message: CreateLoginUserMessage.password.invalidFormat })
  public password!: string;
}
