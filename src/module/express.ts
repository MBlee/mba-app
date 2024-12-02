import { Command } from 'commander';
import chalk from 'chalk';
import { downGit } from '../utils/downGit.js';
import { expressGits } from '../constants/gitUrl.js';
import clipboard from 'clipboardy';
const express = (cmd: Command) => {
  cmd
    .command('express')
    .argument('<apps...>', '项目名称')
    .description('生成Express项目')
    .action((apps) => {
      for (const app of apps) {
        downGit('direct:' + expressGits.default, app).then(() => {
          const hint = `cd ${app} && yarn install`;
          console.log(chalk.magenta(hint));
          clipboard.write(hint);
        });
      }
    });
};

export { express };
