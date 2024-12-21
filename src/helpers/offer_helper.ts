import { AccomodationType } from '../entities/accomodation_type.enum.js';
import { City } from '../entities/city.enum.js';
import { Facility } from '../entities/facility.enum.js';
import { Offer } from '../entities/offer/offer.js';
import { UserType } from '../entities/user/user_type.enum.js';


export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    publicationDate,
    city,
    previewUrl,
    photoUrls,
    isPremium,
    isFavourite,
    rating,
    accomodationType,
    roomsCount,
    guestsCount,
    cost,
    facility,
    lattitude,
    longitude,
    username,
    email,
    password,
    avatar,
    userType
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    email,
    username,
    password,
    avatar,
    userType
  };

  return {
    name,
    description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as City,
    previewUrl,
    photoUrls: photoUrls.split(','),
    isPremium: Boolean(isPremium),
    isFavourite: Boolean(isFavourite),
    rating: Number.parseFloat(rating),
    accomodationType: accomodationType as unknown as AccomodationType,
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    cost: Number.parseInt(cost, 10),
    facility: facility as unknown as Facility,
    coordinates:  {
      latitude: Number.parseFloat(lattitude),
      longitude: Number.parseFloat(longitude)
    },
    user: {
      name: username,
      password,
      email,
      avatar,
      type: userType as unknown as UserType
    }
  };
}
