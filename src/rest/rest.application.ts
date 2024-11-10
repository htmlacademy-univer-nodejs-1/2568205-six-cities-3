import 'reflect-metadata'
import { Config } from "../modules/config/config.interface.js";
import { Logger } from "../modules/logger/logger.interface.js";
import { RestSchema } from "../modules/config/rest.schema.js";
import { injectable, inject } from 'inversify';
import { Component } from '../entities/component.js';
@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async init() {
    this.logger.info('Application initialization 123');
    this.logger.debug('Application initialization debug');
    //console.log(process.env)
    console.log(`Порт - ${this.config.get("PORT")}`)
    console.log(`IP - ${this.config.get("IP")}`)
    console.log(`Соль - ${this.config.get("SALT")}`)


  }
}
