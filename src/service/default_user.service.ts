import { UserService } from './user.service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from '../entities/user/user.entity.js';
import { UserDto } from '../dto/user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../entities/component.js';
import { Logger } from '../modules/logger/logger.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}
 public async exists(documentId: string): Promise<boolean> {
    const exists = await this.userModel.exists({_id: documentId})!==null;
    return exists
  }

  public async create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }
  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
