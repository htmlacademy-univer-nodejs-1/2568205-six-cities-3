import { createOffer } from "../../helpers/offer_helper.js";
import { getErrorMessage } from "../../helpers/common.js";
import { Command } from "./command.interface.js";
import { TSVFileReader } from "../../modules/tsv_file_reader.js";
export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} строк импортировано.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Не удалось импортировать файл: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
