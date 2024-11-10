import axios from "axios";
import { Command } from "./command.interface.js";
import { MockData } from "../../helpers/mock_data_type.js";
import { OfferGenerator } from "../../modules/offer_generator.js";
import { TsvOfferWriter } from "../../modules/tsv_offer_writer.js";

export class GenerateCommand implements Command {
  getName(): string {
    return "--generate"
  }
  async execute(...args: string[]): Promise<void> {
    const [count, filepath, url] = args
    var offersCount = Number.parseInt(count, 10)
    let mockData = await axios.get<MockData>(url)
    //console.log(mockData.data)
    let generator = new OfferGenerator(mockData.data, offersCount)
    let offers = generator.generate()
    let offersWriter = new TsvOfferWriter(filepath, offers)
    offersWriter.writeOffersToTSV()

  }

}
