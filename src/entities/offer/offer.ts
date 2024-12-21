import { AccomodationType } from "../accomodation_type.enum.js"
import { City } from "../city.enum.js"
import { Facility } from "../facility.enum.js"
export {Coordinates} from "./coordinates.js"
import { User } from "../user.js"
import { Coordinates } from "./coordinates.js"

export type Offer = {
  name: string,
  description: string,
  publicationDate: Date,
  city: City,
  previewUrl: string,
  photoUrls: string[],
  isPremium: boolean,
  isFavourite: boolean,
  rating: number,
  accomodationType: AccomodationType,
  roomsCount: number,
  guestsCount: number,
  cost: number,
  facility: Facility,
  coordinates: Coordinates
  user: User

}
