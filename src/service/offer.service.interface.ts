import { CreateOfferDto } from '../dto/offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../entities/offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
