import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../entities/user/user.entity.js';
import { UserDto } from '../dto/user.dto.js';
import { DocumentExists } from './document_exists.interface.js';
//import { CreateUserDto } from '../dto/create_user.dto.js';

export interface UserService extends DocumentExists {
  create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
