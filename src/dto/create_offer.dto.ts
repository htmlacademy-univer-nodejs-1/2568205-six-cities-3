import { AccomodationType } from "../entities/accomodation_type.enum.js";
import { Facility } from "../entities/facility.enum.js";

export class CreateOfferDto {
  name!: string;
  description!: string;
  publicationDate!: Date;
  city!: string;
  previewUrl!: string;
  photoUrls!: string[];
  isPremium!: boolean;
  isFavourite!: boolean;
  type!: AccomodationType;
  roomsCount!: number;
  guestsCount!: number;
  rating!:number
  salary!: number;
  facility!: Facility;
  userId!: string;
}
