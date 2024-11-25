
import dayjs from 'dayjs';
import { Offer } from "../entities/offer.js"
import { Generator } from "./generator.interface.js"
import { MockData } from "../helpers/mock_data_type.js"
import { generateRandomValue, getRandomItem, getRandomItems, getRandomEnumValue } from '../helpers/index.js';
import { City } from "../entities/city.enum.js";
import { Facility } from '../entities/facility.enum.js';
import { AccomodationType } from '../entities/accomodation_type.enum.js';
import { UserType } from '../entities/user_type.enum.js';
export class OfferGenerator implements Generator<Offer> {
  private mockData: MockData
  private offersCount: number
  constructor(mockData: MockData, offersCount: number) {
    this.mockData = mockData
    this.offersCount = offersCount

  }
  generate(): Offer[] {
    let offers: Offer[] = []
    for (let i = 0; i < this.offersCount; i++)
      offers.push(this.generateOffer())
    return offers
  }
  private generateOffer(): Offer {

    const photos = getRandomItems<string>(this.mockData.photos);
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomEnumValue(City) as City
    const preview = getRandomItem(this.mockData.preview)
    const isPremium = getRandomItem<boolean>([true, false])
    const isFavourite = getRandomItem<boolean>([true, false])

    const facility = getRandomEnumValue(Facility) as Facility
    const accomodationType = getRandomEnumValue(AccomodationType) as AccomodationType
    const salary = generateRandomValue(500, 2000);
    const rooms = generateRandomValue(1, 5);
    const rating = generateRandomValue(1, 5);


    const guests = generateRandomValue(1, 5);
    const author = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const password = getRandomItem(this.mockData.passwords);
    const createdDate = dayjs()
      .subtract(generateRandomValue(1, 7), 'day').toDate()
    const avatar = getRandomItem(this.mockData.avatars);
    const type = getRandomEnumValue(UserType) as UserType
    return { name, description, publicationDate: createdDate, city, previewUrl: preview, photoUrls: photos, isPremium, isFavourite, rating, accomodationType, roomsCount: rooms, salary, guestsCount: guests, facility, user: { name: author, email, password, avatar, type: type } }

  }
}
