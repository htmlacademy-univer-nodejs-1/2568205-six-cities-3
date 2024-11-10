
import 'reflect-metadata';
import { PinoLogger } from './modules/logger/pino.logger.js';
import { Container } from 'inversify';
import { Logger } from './modules/logger/logger.interface.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './modules/config/index.js';
import { Component } from './entities/component.js';

async function bootstrap() {

  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
