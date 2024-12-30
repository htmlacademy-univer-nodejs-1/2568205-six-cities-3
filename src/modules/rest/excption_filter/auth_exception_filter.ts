import { inject, injectable } from "inversify";
import { Component } from "../../../entities/component.js";
import { Logger } from "../../logger/logger.interface.js";
import { ExceptionFilter } from "./exception_filter.interface.js";
import { NextFunction, Request, Response } from 'express';
import { BaseUserException } from "../errors/base_user.exception.js";


@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }

}
