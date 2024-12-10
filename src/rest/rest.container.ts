import { Container } from "inversify";
import { RestApplication } from "./rest.application.js";
import { Component } from "../entities/component.js";
import { Logger } from "../modules/logger/logger.interface.js";
import { PinoLogger } from "../modules/logger/pino.logger.js";
import { Config, RestConfig, RestSchema } from "../modules/config/index.js";
import { MongoDatabaseClient } from "../modules/db/mongo_database_client.js";
import { DatabaseClient } from "../modules/db/database_client.interface.js";
import { ExceptionFilter } from "../modules/rest/excption_filter/exception_filter.interface.js";
import { AppExceptionFilter } from "../modules/rest/excption_filter/app_exception_filter.js";

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  return restApplicationContainer;
}
