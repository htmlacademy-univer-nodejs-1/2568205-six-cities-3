import { DotenvParseOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Config } from './config.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../entities/component.js';
@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedConfig = config()
    if (parsedConfig.error)
      throw new Error('Не корректный конфинг')
    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
