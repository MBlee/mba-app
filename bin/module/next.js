import { downGit } from '../utils/downGit.js';
import { nextGits } from '../constants/gitUrl.js';
const next = (cmd) => {
    cmd
        .command('next')
        .argument('<apps...>', '项目名称')
        .description('生成next项目')
        .action((apps) => {
        for (const app of apps) {
            downGit('direct:' + nextGits.default, app);
        }
    });
};
export { next };
