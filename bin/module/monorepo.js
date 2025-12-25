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
import chalk from 'chalk';
import { downGit } from '../utils/downGit.js';
import { monorepoGits } from '../constants/gitUrl.js';
import clipboard from 'clipboardy';
import Handlebars from 'handlebars';
import { rdFile, rewriteFile } from '../utils/fsSys.js';
const monorepo = (cmd) => {
    cmd
        .command('monorepo')
        .argument('<apps...>', '项目名称')
        .description('生成monorepo项目')
        .action((apps) => {
        for (const app of apps) {
            downGit('direct:' + monorepoGits.default, app).then(() => __awaiter(void 0, void 0, void 0, function* () {
                const file = resolve(app, 'package.json');
                const replaceData = { name: app };
                let data = yield rdFile(file);
                data = Handlebars.compile(data)(replaceData);
                yield rewriteFile(file, data);
                console.log(chalk.cyan(`写入内容：${JSON.stringify(replaceData)}`));
                const hint = `cd ${app}`;
                console.log(chalk.magenta(hint));
                clipboard.write(hint);
            }));
        }
    });
};
export { monorepo };
