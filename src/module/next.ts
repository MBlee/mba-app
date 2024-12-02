import { Command } from "commander";
import chalk from "chalk";
import { downGit } from "../utils/downGit.js";
import { nextGits } from "../constants/gitUrl.js";
const next = (cmd: Command) => {
	cmd.command('next')
    .argument('<apps...>','项目名称')
    .description('生成next项目').action((apps)=>{
        for (const app of apps) {
            console.log('app',app);
            continue
            downGit('direct:'+nextGits.default,app)
        }
	})
};

export { next };
