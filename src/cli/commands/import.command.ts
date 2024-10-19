import { OfferParser } from "../../modules/offer_parser.js";
import { Command } from "./command.interface.js";

export class ImportCommand implements Command {
    public getName(): string {
      return '--import';
    }

    public execute(...parameters: string[]): void {
      const [filename] = parameters;
      const fileReader = new OfferParser(filename.trim());

      try {
        fileReader.read();
        console.log(fileReader.parse());
      } catch (err) {

        if (!(err instanceof Error)) {
          throw err;
        }

        console.error(`Can't import data from file: ${filename}`);
        console.error(`Details: ${err.message}`);
      }
    }
  }
