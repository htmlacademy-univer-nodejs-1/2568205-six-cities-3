import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../entities/user.entity.js';
import { CreateUserDto } from '../dto/user.dto.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
