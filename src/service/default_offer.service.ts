import { inject, injectable } from 'inversify';
import { OfferService } from './offer.service.interface.js';
import { Component } from '../entities/component.js';
import { Logger } from '../modules/logger/logger.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from '../entities/offer/offer.entity.js';
import { CreateOfferDto } from '../dto/create_offer.dto.js';
import { OfferDto } from '../dto/offer.dto.js';
import { SortType } from '../entities/sort_type.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async addTofavourite(offerId: string, userId: string): Promise<void> {
    this.offerModel.findByIdAndUpdate(offerId, {$addToSet:{favouritesUsers:userId}}).exec()
  }
  public async removeFromFavourite(offerId: string, userId: string): Promise<void> {
    this.offerModel.findByIdAndUpdate(offerId, {$pull:{favouritesUsers:userId}})
  }
  public async getFavouritesByUser(userId: string)
  {
    return this.offerModel.find({favouritesUsers:userId}).exec()
  }
  public async delete(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    let offer = await  this.offerModel.findByIdAndDelete(offerId).exec()
    return offer
  }
  public async updateById(id: string, offerDto: OfferDto): Promise<DocumentType<OfferEntity> | null> {
   const result = await this.offerModel.findByIdAndUpdate(id, offerDto).exec()
   return result
  }
  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    let offers = await this.offerModel.find({$and: [{'city': city}, {'isPremium':true}] }).exec()
    return offers
  }
 public async calculateRating(id: string, oldRating: number, newRating: number, ratingCount: number) {
  this.offerModel.findByIdAndUpdate(id, {'rating': (oldRating+newRating)/ratingCount})
 }
 public async findAll(limit: number): Promise<DocumentType<OfferEntity>[]> {
  return this.offerModel
    .find()
    .sort({offerCount: SortType.Down})
    .limit(limit)
    .exec();
}
public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
  return this.offerModel
    .findByIdAndUpdate(offerId, {'$inc': {
      commentCount: 1,
    }}).exec();
}
}
