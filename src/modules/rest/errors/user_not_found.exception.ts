import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base_user.exception.js';

export class UserNotFoundException extends BaseUserException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}
