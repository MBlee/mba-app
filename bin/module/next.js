var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { resolve } from 'path';
import { rdFile, rewriteFile } from '../utils/fsSys.js';
import chalk from 'chalk';
import clipboard from 'clipboardy';
import { downGit } from '../utils/downGit.js';
import { nextGits } from '../constants/gitUrl.js';
import Handlebars from 'handlebars';
const next = (cmd) => {
    cmd
        .command('next')
        .argument('<apps...>', '项目名称')
        .description('生成next项目')
        .action((apps) => {
        for (const app of apps) {
            downGit('direct:' + nextGits.default, app).then(() => __awaiter(void 0, void 0, void 0, function* () {
                const pkg = resolve(app, 'package.json');
                const page = resolve(app, 'src/app/page.tsx');
                const layout = resolve(app, 'src/app/layout.tsx');
                console.log('page:', page);
                console.log('layout:', layout);
                const replaceData = { appName: app };
                let data = yield rdFile(pkg);
                data = Handlebars.compile(data)(replaceData);
                yield rewriteFile(pkg, data);
                console.log(chalk.cyan(`${pkg}写入内容：${JSON.stringify(replaceData)}`));
                data = yield rdFile(page);
                data = Handlebars.compile(data)(replaceData);
                yield rewriteFile(page, data);
                console.log(chalk.cyan(`${page}写入内容：${JSON.stringify(replaceData)}`));
                data = yield rdFile(layout);
                data = Handlebars.compile(data)(replaceData);
                yield rewriteFile(layout, data);
                console.log(chalk.cyan(`${layout}写入内容：${JSON.stringify(replaceData)}`));
                const hint = `cd ${app} && pnpm i && pnpm dev `;
                console.log(chalk.magenta(hint));
                clipboard.write(hint);
            }));
        }
    });
};
export { next };
