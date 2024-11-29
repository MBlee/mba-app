import { Command } from "commander";
import chalk from "chalk";

const help = (cmd: Command) => {
	cmd.command('help').description('帮助命令').action(()=>{
		console.log(chalk.cyan('这是帮助命令'))
	})
};

export { help };
