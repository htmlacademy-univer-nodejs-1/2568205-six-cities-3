import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';


export class CreateCommentDto {
  @IsString({ message: 'text must be string' })
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public text!: string;
  @IsInt({message: 'rating must be an integer from 1 to 5'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsMongoId({ message: 'invalid offer id' })
  public offerId!: string;

  @IsMongoId({ message: 'invalid UserId' })
  public userId!: string;
}
