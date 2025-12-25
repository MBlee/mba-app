import { resolve } from 'path';
import { Command } from 'commander';
import chalk from 'chalk';
import { downGit } from '../utils/downGit.js';
import { monorepoGits } from '../constants/gitUrl.js';
import clipboard from 'clipboardy';
import Handlebars from 'handlebars';
import { rdFile, rewriteFile } from '../utils/fsSys.js';

const monorepo = (cmd: Command) => {
  cmd
    .command('monorepo')
    .argument('<apps...>', '项目名称')
    .description('生成monorepo项目')
    .action((apps) => {
      for (const app of apps) {
        downGit('direct:' + monorepoGits.default, app).then(async () => {
          const file = resolve(app, 'package.json');
          const replaceData = { name: app };

          let data = await rdFile(file);
          data = Handlebars.compile(data)(replaceData);
          await rewriteFile(file, data);
          console.log(chalk.cyan(`写入内容：${JSON.stringify(replaceData)}`));

          const hint = `cd ${app}`;
          console.log(chalk.magenta(hint));
          clipboard.write(hint);
        });
      }
    });
};

export { monorepo };
