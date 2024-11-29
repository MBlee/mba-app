import { downGit } from "../utils/downGit.js";
const express = (cmd) => {
    cmd.command('express')
        .argument('<apps...>', '项目名称')
        .description('生成Express项目').action((apps) => {
        for (const app of apps) {
            downGit('direct:https://gitee.com/li-yi1960553/mba-app-express.git', app);
        }
    });
};
export { express };
