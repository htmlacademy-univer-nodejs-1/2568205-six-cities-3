import { UserEntity } from '../entities/user/user.entity.js';
import { LoginUserDto } from '../dto/login_user.dto.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
