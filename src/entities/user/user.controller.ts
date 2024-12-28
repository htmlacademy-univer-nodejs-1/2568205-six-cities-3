import { inject, injectable } from "inversify";
import { BaseController } from "../../modules/rest/controller/base_controller.abstart.js";
import { Component } from "../component.js";
import { Logger } from "../../modules/logger/logger.interface.js";
import { UserService } from "../../service/user.service.interface.js";
import { Config } from "../../modules/config/config.interface.js";
import { RestSchema } from "../../modules/config/index.js";
import { HttpMethod } from "../../modules/rest/types/http_method.enum.js";
import { CreateUserRequest } from "./create_user_request.js";
import { StatusCodes } from "http-status-codes";
import { fillDTO } from "../../helpers/common.js";
import { Request, Response } from "express";
import { UserRdo } from "../../rdo/user_rdo.js";
import { LoginUserRequest } from "./login_user_request.js";
import { HttpError } from "../../modules/rest/errors/http_error.js";
import { ValidateDtoMiddleware } from "../../modules/rest/middleware/validate_dto.middleware.js";
import { UserDto } from "../../dto/user.dto.js";
import { LoginUserDto } from "../../dto/login_user.dto.js";
import { ValidateObjectIdMiddleware } from "../../modules/rest/middleware/validate_object.middleware.js";
import { UploadFileMiddleware } from "../../modules/rest/middleware/user_upload_avar.midddleware.js";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(UserDto)] });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)] });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
  public async uploadAvatar(req: Request, res: Response) {
    console.log(req)
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
