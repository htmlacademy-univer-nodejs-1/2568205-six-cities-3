import { CLIApplication } from "./cli/cli_application.js";
import { HelpCommand } from "./cli/commands/help.command.js";
import { ImportCommand } from "./cli/commands/import.command.js";
import { VersionCommand } from "./cli/commands/version.commannd.js";


function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand('./package.json'),
    new ImportCommand()
  ]);
  console.log(process.argv)

  cliApplication.processCommand(process.argv);
}

bootstrap();
