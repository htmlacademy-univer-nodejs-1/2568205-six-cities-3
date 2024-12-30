import { Container } from 'inversify';
import { AuthService } from './auth.service.interface.js';
import { Component } from '../../entities/component.js';
import { DefaultAuthService } from './default_auth.service.js';
import { ExceptionFilter } from '../rest/excption_filter/exception_filter.interface.js';
import { AuthExceptionFilter } from '../rest/excption_filter/auth_exception_filter.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
