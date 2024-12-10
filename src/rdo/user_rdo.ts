import { Expose } from "class-transformer";

export class UserRdo {
  @Expose()
  public name!:string
}
