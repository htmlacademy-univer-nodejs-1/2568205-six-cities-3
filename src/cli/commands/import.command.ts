
import { MongoDatabaseClient } from '../../modules/db/mongo_database_client.js';
import { DatabaseClient } from '../../modules/db/database_client.interface.js';

import { Logger } from '../../modules/logger/logger.interface.js';
import { PinoLogger } from '../../modules/logger/pino.logger.js';
import  {UserEntity, UserModel} from '../../entities/user/user.entity.js'
import { types } from '@typegoose/typegoose';

import { Offer } from '../../entities/offer/offer.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../entities/component.js';
import { Command } from './command.interface.js';
import { getMongoURI } from '../../helpers/database.js';
import { createOffer } from '../../helpers/offer_helper.js';
import { TSVFileReader } from '../../modules/tsv_file_reader.js';
import { getErrorMessage } from '../../helpers/common.js';
import { OfferModel } from '../../entities/offer/offer.entity.js';
import { UserService } from '../../service/user.service.interface.js';
import { OfferService } from '../../service/offer.service.interface.js';
import { DefaultOfferService } from '../../service/default_offer.service.js';
import { DefaultUserService } from '../../service/default_user.service.js';
export class ImportCommand implements Command {


  private userService: UserService;

  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: ()=>void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve()
  }

  private async onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect()

  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: '1234'
    }, this.salt);
    await this.offerService.create({
      userId: user.id,
      name: offer.name,
      description: offer.description,
      previewUrl: offer.previewUrl,
      publicationDate: offer.publicationDate,
      isFavourite: offer.isFavourite,
      isPremium: offer.isPremium,
      city: offer.city,
      photoUrls: offer.photoUrls,
      rating: offer.rating,
      type: offer.accomodationType,
      roomsCount: offer.roomsCount,
      guestsCount:offer.guestsCount,
      salary: offer.salary,
      facility: offer.facility
    });
    console.log('Сохранено')
    }





  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, '27017', dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
