import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { UserEntity } from "../user/user.entity.js";
import { OfferEntity } from "../offer/offer.entity.js";
export interface CommentEntity extends defaultClasses.Base
{

}
@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps
{
  @prop({ trim: true, required: true })
  public text!: string;
  @prop({ trim: true, required: true })
  public date!: Date;
  @prop({ trim: true, required: true })
  public rating!: number
  @prop({ trim: true, required: true })
  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;
}
export const CommentModel = getModelForClass(CommentEntity, {options: { allowMixed: Severity.ALLOW }});
