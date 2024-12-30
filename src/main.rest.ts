
import 'reflect-metadata';
import { PinoLogger } from './modules/logger/pino.logger.js';
import { Container } from 'inversify';
import { Logger } from './modules/logger/logger.interface.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './modules/config/index.js';
import { Component } from './entities/component.js';
import { DatabaseClient } from './modules/db/database_client.interface.js';
import { MongoDatabaseClient } from './modules/db/mongo_database_client.js';
import { OfferService } from './service/offer.service.interface.js';
import { DefaultOfferService } from './service/default_offer.service.js';
import { UserService } from './service/user.service.interface.js';
import { DefaultUserService } from './service/default_user.service.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './entities/offer/offer.entity.js';
import { UserEntity, UserModel } from './entities/user/user.entity.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './entities/user/user.container.js';
import { createOfferContainer } from './entities/offer/offer.container.js';
import { createCommentContainer } from './entities/comment/comment.container.js';
import { createAuthContainer } from './modules/auth/auth.container.js';

async function bootstrap() {

  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );


  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
