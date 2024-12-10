import { Expose } from "class-transformer";
import { AccomodationType } from "../entities/accomodation_type.enum.js";
import { City } from "../entities/city.enum.js";
import { Facility } from "../entities/facility.enum.js";

export class DetailedOfferRdo {
  @Expose()
  public name!: string;
  @Expose()
  public description!: string;
  @Expose()
  public publicationDate!: Date;
  @Expose()
  public city!: City;
  @Expose()
  public previewUrl!: string;
  @Expose()
  public photoUrls!: string[];
  @Expose()
  public isFavoutite!: boolean;
  @Expose()
  public isPremium!: boolean;
  @Expose()
  public rating!: number;
  @Expose()
  public type!: AccomodationType;
  @Expose()
  public roomsCount!:number;
  @Expose()
  public guestsCount!:number;
  @Expose()
  public salary!:number;
  @Expose()
  public facility!:Facility;
  @Expose()
  public userId!: string
}
