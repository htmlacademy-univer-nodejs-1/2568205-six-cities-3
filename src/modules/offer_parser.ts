import { readFileSync } from "fs";
import { Offer } from "../entities/offer.js";
import { Parser } from "./parser.interface.js";
import { City } from "../entities/city.enum.js";
import { AccomodationType } from "../entities/accomodation_type.enum.js";
import { Facility } from "../entities/facility.enum.js";
import { UserType } from "../entities/user_type.enum.js";

export class OfferParser implements Parser<Offer> {
    constructor(
        private filePath: string,
        private rawData: string = ''
    ) {}
    read(): void {
        this.rawData = readFileSync(this.filePath, { encoding: 'utf-8' })
    }

    parse(): Offer[] {
        return this.rawData.split('\n')
        .filter(row=>row.trim().length>0)
        .map(line=>line.split('\t'))
        .map(([name, description, publictionDate, city, previewUrl, photoUrls, isPremium, isFavourite,
            rating, accomodationType, roomsCount, guestsCount, salary, facility, userName, email, password, avatar, userType])=>({
                name,
                description,
                publicationDate: new Date(publictionDate),
                city: city as unknown as City,
                previewUrl,
                photoUrls: photoUrls.split(';'),
                isPremium: Boolean(isPremium),
                isFavourite: Boolean(isFavourite),
                rating: Number.parseFloat(rating),
                accomodationType: accomodationType as unknown as AccomodationType,
                roomsCount: Number.parseInt(roomsCount, 10),
                guestsCount: Number.parseInt(guestsCount, 10),
                salary: Number.parseInt(salary, 10),
                facility: facility as unknown as Facility,
                user: {
                    name: userName,
                    password,
                     email,
                      avatar,
                        type: userType as unknown as UserType
                    }


        }))
    }

}
