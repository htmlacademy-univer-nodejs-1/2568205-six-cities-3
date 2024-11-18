import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { City } from './city.enum.js';
import { AccomodationType } from './accomodation_type.enum.js';
import { Facility } from './facility.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({trim: true, required: true})
  public description!: string;


  @prop({required: true})
  public publicationDate!: Date;

  @prop({
    type: () => [String],
    enum: City
  })
  public city!: City;


 @prop()
 public previewUrl!:String;
 @prop()
 public photoUrls!: String[];
 @prop()
 public isFavoutite!: Boolean;
 @prop()
 public isPremium!: Boolean;
 @prop()
 public rating!: number;
 @prop(
 {
  type: () => [String],
  enum: AccomodationType
 })
 public accomodationType!:AccomodationType;
 @prop()
 public roomsCount!:number
 @prop()
 public guestsCount!:number
 @prop()
 public salary!:number
 @prop(
  {
   type: () => [String],
   enum: Facility
  })
  public facility!:Facility;




  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity, {options: { allowMixed: Severity.ALLOW }});
