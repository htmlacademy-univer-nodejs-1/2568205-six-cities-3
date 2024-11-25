import { UserType } from "../entities/user_type.enum.js";

export class CreateUserDto {
  public email: string;
  public avatar: string;
  public name: string;
  public password: string;
  public type: UserType;
  constructor(email:string, avatarPath: string, username: string, password: string, type:UserType){
    this.email = email
    this.avatar = avatarPath
    this.name = username
    this.password = password
    this.type = type

  }
}