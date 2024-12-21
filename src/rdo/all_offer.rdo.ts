import { Expose } from "class-transformer";
import { AccomodationType } from "../entities/accomodation_type.enum.js";

export class AllOfferRDO
{
  @Expose()
  public _id!:string;
  @Expose()
  public name!: string;
  @Expose()
  public city!: string;
  @Expose()
  public cost!: number;
  @Expose()
  public type!: string;
  @Expose()
  public isFavourite!: string;
  @Expose()
  public publicationDate!: Date;
  @Expose()
  public previewUrl!: string;
  @Expose()
  public rating!: number;
  @Expose()
  public commentCount!: number;

}
