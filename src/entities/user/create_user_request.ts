import { Request } from 'express';
import { RequestBody } from '../../modules/rest/types/request_body.js';
import { RequestParams } from '../../modules/rest/types/request_params.js';
//import { CreateUserDto } from '../../dto/create_user.dto.js';
import { UserDto } from '../../dto/user.dto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, UserDto>;
