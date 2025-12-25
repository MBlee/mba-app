import { resolve } from 'path';
import { rdFile, rewriteFile } from '../utils/fsSys.js';
import { Command } from 'commander';
import chalk from 'chalk';
import clipboard from 'clipboardy';
import { downGit } from '../utils/downGit.js';
import { nextGits } from '../constants/gitUrl.js';
import Handlebars from 'handlebars';

const next = (cmd: Command) => {
  cmd
    .command('next')
    .argument('<apps...>', '项目名称')
    .description('生成next项目')
    .action((apps) => {
      for (const app of apps) {
        downGit('direct:' + nextGits.default, app).then(async () => {
          const pkg = resolve(app, 'package.json');
          const page = resolve(app, 'src/app/page.tsx');
          const layout = resolve(app, 'src/app/layout.tsx');
          console.log('page:', page);
          console.log('layout:', layout);
          const replaceData = { appName: app };

          let data = await rdFile(pkg);
          data = Handlebars.compile(data)(replaceData);
          await rewriteFile(pkg, data);
          console.log(chalk.cyan(`${pkg}写入内容：${JSON.stringify(replaceData)}`));

          data = await rdFile(page);
          data = Handlebars.compile(data)(replaceData);
          await rewriteFile(page, data);
          console.log(chalk.cyan(`${page}写入内容：${JSON.stringify(replaceData)}`));

          data = await rdFile(layout);
          data = Handlebars.compile(data)(replaceData);
          await rewriteFile(layout, data);
          console.log(chalk.cyan(`${layout}写入内容：${JSON.stringify(replaceData)}`));

          const hint = `cd ${app} && pnpm i && pnpm dev `;
          console.log(chalk.magenta(hint));
          clipboard.write(hint);
        });
      }
    });
};

export { next };
