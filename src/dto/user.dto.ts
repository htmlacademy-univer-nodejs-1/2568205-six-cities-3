import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { UserType } from "../entities/user/user_type.enum.js";
import { CreateUserMessages } from "./create_user_messages.dto.js";

export class UserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;
  @IsString({message: CreateUserMessages.avatar.invalidFormat})
  public avatar!: string;
  @IsString({message: CreateUserMessages.name.invalidFormat})
  @Length(1, 15, {message: CreateUserMessages.name.invalidLength})
  public name!: string;
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password!: string;
  @IsEnum(UserType, {message: CreateUserMessages.type.invalidFormat})
  public type!: UserType;

}
