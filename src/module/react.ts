import { Command } from 'commander';
import chalk from 'chalk';
import { downGit } from '../utils/downGit.js';
import { reactGits } from '../constants/gitUrl.js';
import clipboard from 'clipboardy';
const react = (cmd: Command) => {
  // 默认Vite项目
  cmd
    .command('react')
    .argument('<apps...>', '项目名称')
    .description('生成react项目')
    .action((apps) => {
      for (const app of apps) {
        downGit('direct:' + reactGits.default, app).then(() => {
          const hint = `cd ${app} && npm install`;
          console.log(chalk.magenta(hint));
          clipboard.write(hint);
        });
      }
    });
  // Craco项目
  cmd
    .command('react-craco')
    .argument('<apps...>', '项目名称')
    .description('生成react-craco项目')
    .action((apps) => {
      for (const app of apps) {
        downGit('direct:' + reactGits.craco, app).then(() => {
          const hint = `cd ${app} && npm install`;
          console.log(chalk.magenta(hint));
          clipboard.write(hint);
        });
      }
    });
};

export { react };
