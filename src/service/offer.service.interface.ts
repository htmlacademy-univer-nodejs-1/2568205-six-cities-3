import { CreateOfferDto } from '../dto/create_offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../entities/offer/offer.entity.js';
import { OfferDto } from '../dto/offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>
  addTofavourite(offerId: string, userId: string): void
  removeFromFavourite(offerId: string, userId: string): void
  delete(offerId:string): Promise<DocumentType<OfferEntity> | null>
  updateById(id: string, offerDto: OfferDto): Promise<DocumentType<OfferEntity> | null>
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>
}
