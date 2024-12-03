import { AccomodationType } from "../entities/accomodation_type.enum.js";
import { City } from "../entities/city.enum.js";
import { Facility } from "../entities/facility.enum.js";
export class OfferDto {
  constructor(
    public name: string,
    public description: string,
    public publicationDate: Date,
    public city: City,
    public previewUrl: string,
    public photoUrls: string[],
    public isFavoutite: boolean,
    public isPremium: boolean,

    public rating: number,
    public type: AccomodationType,
    public roomsCount:number,
    public guestsCount:number,
    public salary:number,
    public facility:Facility,
    public userId: string
  ) {}

}
