import 'reflect-metadata'
import { Config } from "../modules/config/config.interface.js";
import { Logger } from "../modules/logger/logger.interface.js";
import { RestSchema } from "../modules/config/rest.schema.js";
import { injectable, inject } from 'inversify';
import { Component } from '../entities/component.js';
import { DatabaseClient } from '../modules/db/database_client.interface.js';
import { getMongoURI } from '../helpers/database.js';
import { UserModel } from '../entities/user/user.entity.js';
import express, { Express } from 'express';
import { Controller } from '../modules/rest/controller/controller.interface.js';
import { ExceptionFilter } from '../modules/rest/excption_filter/exception_filter.interface.js';
@injectable()
export class RestApplication {
  private server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UserController) private readonly userController:Controller,
    @inject(Component.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter
  ) {
    this.server = express()
   }
  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }
  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }
  private async _initControllers() {
    this.server.use('/offers', this.offerController.router)
    this.server.use('/users', this.userController.router)
  }
  private async _initMiddleware() {
    this.server.use(express.json());
  }
  private async _initExceptionFilters() {
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }
  public async init() {
    this.logger.info('Application initialization 123');
    this.logger.debug('Application initialization debug');
    //console.log(process.env)
    console.log(`Порт - ${this.config.get("PORT")}`)
    console.log(`IP - ${this.config.get("DB_HOST")}`)
    console.log(`Соль - ${this.config.get("SALT")}`)
    this.logger.info('Init database...');
    await this._initDb();
    await this._initServer();
    this.logger.info('Init server')
    await this._initMiddleware()
    this.logger.info('Middleware')
    await this._initControllers()
    this.logger.info('Controllrs started')
    await this._initExceptionFilters()


  }
}
