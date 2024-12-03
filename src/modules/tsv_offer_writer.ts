import { Offer } from "../entities/offer/offer.js"
import { User, isUser } from "../entities/user.js";
import { UserType } from "../entities/user/user_type.enum.js";
import { TSVFileWriter } from "../helpers/file_writer.js";
export class TsvOfferWriter {
  private filePath: string;
  private offers: Offer[]
  constructor(filePath: string, offers: Offer[]) {
    this.filePath = filePath
    this.offers = offers
  }
  writeOffersToTSV() {
    var fileWriter = new TSVFileWriter(this.filePath)
    this.offers.forEach(offer => {
      fileWriter.write(makeTsvRow(offer))

    });
  }
}

function makeTsvRow(offer: Offer): string {
  let result = ''
  let key: keyof Offer
  for (key in offer) {
    let parameter = offer[key]
    if (isUser(parameter)) {
      let objectKey: keyof User
      let user = parameter as User
      for (objectKey in user) {
        //console.log(user[objectKey])
        result += user[objectKey].toString() + '\t'
      }

    }
    else result += parameter.toString() + '\t'
  }



  return result
}
