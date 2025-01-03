import { OfferModel } from "./offer/offer.entity.js";
import { UserModel } from "./user/user.entity.js";

export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  OfferService: Symbol.for('OfferService'),
  CommentService: Symbol.for('CommentService'),
  UserService: Symbol.for('UserService'),
  OfferController:Symbol.for('OfferController'),
  UserController: Symbol.for('UserController'),
  CommentsController: Symbol.for('CommentsController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter')


} as const;
