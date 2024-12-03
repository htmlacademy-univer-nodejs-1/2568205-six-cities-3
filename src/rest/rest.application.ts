import 'reflect-metadata'
import { Config } from "../modules/config/config.interface.js";
import { Logger } from "../modules/logger/logger.interface.js";
import { RestSchema } from "../modules/config/rest.schema.js";
import { injectable, inject } from 'inversify';
import { Component } from '../entities/component.js';
import { DatabaseClient } from '../modules/db/database_client.interface.js';
import { getMongoURI } from '../helpers/database.js';
import { UserModel } from '../entities/user/user.entity.js';
@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) { }
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
  public async init() {
    this.logger.info('Application initialization 123');
    this.logger.debug('Application initialization debug');
    //console.log(process.env)
    console.log(`Порт - ${this.config.get("PORT")}`)
    console.log(`IP - ${this.config.get("DB_HOST")}`)
    console.log(`Соль - ${this.config.get("SALT")}`)
    this.logger.info('Init database...');
    await this._initDb();
    this.logger.info('Init database completed');
    const user = {
      email: 'test@emailru',
      avatarPath: 'keks.jpg',
      password: 'qwerty',
      type: 'Basic'
     };
    const saved = await new UserModel({user}).save()


  }
}
