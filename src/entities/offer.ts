import { AccomodationType } from "./accomodation_type.enum.js"
import { City } from "./city.enum.js"
import { Facility } from "./facility.enum.js"
import { User } from "./user.js"

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
  salary: number,
  facility: Facility,
  user: User

}
