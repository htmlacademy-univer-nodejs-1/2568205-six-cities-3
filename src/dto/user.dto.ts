import { UserType } from "../entities/user/user_type.enum.js";

export class UserDto {
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
