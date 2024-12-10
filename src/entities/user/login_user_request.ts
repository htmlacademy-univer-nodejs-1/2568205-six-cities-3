import { Request } from 'express';
import { RequestBody } from '../../modules/rest/types/request_body.js';
import { RequestParams } from '../../modules/rest/types/request_params.js';
import { LoginUserDto } from '../../dto/login_user.dto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
