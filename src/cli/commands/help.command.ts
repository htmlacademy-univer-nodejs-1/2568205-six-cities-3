import chalk from "chalk";
import { Command } from "./command.interface.js";

export class HelpCommand implements Command {
  getName(): string {
    return "--help"
  }
  execute(..._args: string[]): void {
    console.log(chalk.yellow(`--help — выводит информацию о списке поддерживаемых команд. Полный список команд доступен в техническом задании к проекту. Эта команда используется по умолчанию (если пользователь не ввёл никакого параметра).
--version — выводит информации о версии приложения. Версия приложения считывается из файла package.json.
--import — импортирует данные из *.tsv-файла.`))
  }

}
