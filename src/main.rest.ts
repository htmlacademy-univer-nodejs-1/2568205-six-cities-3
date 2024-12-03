
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

async function bootstrap() {

  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);


  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
