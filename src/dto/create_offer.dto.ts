import { Type } from "class-transformer";
import { AccomodationType } from "../entities/accomodation_type.enum.js";
import { City } from "../entities/city.enum.js";
import { Facility } from "../entities/facility.enum.js";
import { Coordinates } from "../entities/offer/coordinates.js";
import { CreateOfferValidationMessage } from "./create_offer_error_message.js";
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsEnum, IsInt, IsMongoId, IsNumber, IsObject, IsPositive, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.name.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.name.maxLength})
  name!: string;
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  description!: string;
  @IsDateString({}, {message: CreateOfferValidationMessage.publicationDate.invalidFormat})
  publicationDate!: Date;
  @IsEnum(City, {message: CreateOfferValidationMessage.city.invalid})
  city!: City;
  @MaxLength(256, {message: CreateOfferValidationMessage.previewUrl.maxLength})
  previewUrl!: string;
  @IsArray({message: CreateOfferValidationMessage.photoUrls.invalid})
  photoUrls!: string[];
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalid})
  isPremium!: boolean;
  @IsBoolean({message: CreateOfferValidationMessage.isFavourite.invalid})
  isFavourite!: boolean;
  @IsEnum(AccomodationType, {message: CreateOfferValidationMessage.accomodationType.invalid})
  type!: AccomodationType;
  @IsInt({message: CreateOfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsCount.minValue})
  @Max(5, {message: CreateOfferValidationMessage.roomsCount.maxValue})
  roomsCount!: number;
  @IsInt({message: CreateOfferValidationMessage.guestCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestCount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestCount.maxValue})
  guestsCount!: number;
  @IsNumber({maxDecimalPlaces: 1}, {message: CreateOfferValidationMessage.guestCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestCount.minValue})
  @Max(5, {message: CreateOfferValidationMessage.guestCount.maxValue})
  rating!:number;
  @Min(100, {message: CreateOfferValidationMessage.cost.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.cost.maxValue})
  cost!: number;
  @IsEnum(Facility, {message: CreateOfferValidationMessage.facility.invalid})
  facility!: Facility;
  @IsObject({message: CreateOfferValidationMessage.coordinates.invalid})
  coordinates!: Coordinates;
  userId!: string;
}
