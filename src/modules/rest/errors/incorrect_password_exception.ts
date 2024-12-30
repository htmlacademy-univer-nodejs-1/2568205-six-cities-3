import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base_user.exception.js';

export class UserPasswordIncorrectException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
