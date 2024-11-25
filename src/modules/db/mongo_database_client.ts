import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database_client.interface.js';
import { Component } from '../../entities/component.js';
import { Logger } from '../logger/logger.interface.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose!: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    this.logger.info('disconnecting')
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    try {
      await this.mongoose.connection.close()
    }
    catch (error)
    {
     console.log(error)
    }

    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
