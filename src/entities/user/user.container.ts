import { Container } from "inversify";
import { UserService } from "../../service/user.service.interface.js";
import { Component } from "../component.js";
import { DefaultUserService } from "../../service/default_user.service.js";
import { types } from "@typegoose/typegoose";
import { UserEntity, UserModel } from "./user.entity.js";

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
