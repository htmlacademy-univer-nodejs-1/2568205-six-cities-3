import { readFileSync } from "fs";
import { Command } from "./command.interface.js";
import  chalk from "chalk";


export class VersionCommand implements Command {
    constructor(
        private readonly filePath:string
    ) {}
    getName(): string {
        return "--version"
    }
    execute(..._args: string[]): void {
        try {
            console.log(chalk.red(this.readVersion()))
        }
        catch(error)
        {
            console.log(error)
        }

    }
    isPackageJsonConfig( jsonConfig: unknown): boolean {
        return typeof jsonConfig==='object' && jsonConfig !== null &&
        !Array.isArray(jsonConfig) && Object.hasOwn(jsonConfig, "version")
    }
    readVersion(): string {
        let config = readFileSync(this.filePath).toString()
        let jsonConfig = JSON.parse(config)
        if (! this.isPackageJsonConfig(jsonConfig))
            throw Error("Failed to parse content")
        return jsonConfig.version
    }

}
