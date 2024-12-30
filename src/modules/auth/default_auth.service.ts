import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { AuthService } from './auth.service.interface.js';
import { Component } from '../../entities/component.js'
import { Logger } from '../logger/logger.interface.js';
import { UserEntity } from '../../entities/user/user.entity.js';
import { LoginUserDto } from '../../dto/login_user.dto.js';
import { TokenPayload } from '../../entities/user/token_payload.js';
import { Config } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';
import { UserPasswordIncorrectException } from '../rest/errors/incorrect_password_exception.js'
import { UserNotFoundException } from '../rest/errors/user_not_found.exception.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from './auth.constant.js';
import { UserService } from '../../service/user.service.interface.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (! user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }


}
