import chalk from 'chalk';
import fs from 'fs';
export enum fileType {
  NOTEXIST,
  ISFILE,
  ISDIR,
}
const mMkdir = (dir: string) =>
  new Promise<void>((res) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        return console.log(`创建文件夹${dir}失败`);
      }
      console.log(`创建文件夹${dir}成功`);
      res();
    });
  });
const isFile = (file: string) =>
  new Promise<any>((res) => {
    fs.stat(file, (err, stat) => {
      if (err) return res(fileType.NOTEXIST);
      if (stat.isFile()) {
        res(fileType.ISFILE);
      } else {
        res(fileType.ISDIR);
      }
    });
  });
const mkFile = (file: string, content: string = '') =>
  new Promise<void>((res) => {
    isFile(file).then((type) => {
      console.log('type', type);
      if (type === fileType.NOTEXIST) {
        fs.writeFile(file, content, (err) => {
          if (err) return console.log(chalk.redBright(`创建文件${file}失败`));
          console.log(chalk.green(`创建文件${file}成功`));
          return res();
        });
      } else if (type === fileType.ISFILE) {
        console.log(chalk.cyanBright(`文件${file}已存在`));
      } else if (type === fileType.ISDIR) {
        console.log(chalk.redBright(`已有同名文件夹${file}`));
      }
    });
  });

const rdFile = (file: string) =>
  new Promise<any>((res) => {
    isFile(file).then((type) => {
      if (type !== fileType.ISFILE) return;
      const fileContent = fs.readFileSync(file).toString();
      return res(fileContent);
    });
  });
const rewriteFile = (file: string, content: string = '') =>
  new Promise<void>((res) => {
    isFile(file).then((type) => {
      if (type === fileType.NOTEXIST) {
        fs.writeFile(file, content, (err) => {
          if (err) return console.log(chalk.redBright(`创建文件${file}失败`));
          console.log(chalk.green(`创建文件${file}成功`));
          res();
        });
      } else if (type === fileType.ISFILE) {
        fs.writeFile(file, content, (err) => {
          if (err) return console.log(chalk.redBright(`写入文件${file}失败`));
          console.log(chalk.green(`写入文件${file}成功`));
          res();
        });
      } else if (type === fileType.ISDIR) {
        console.log(chalk.redBright(`已有同名文件夹${file}`));
      }
    });
  });
export { mMkdir, mkFile, rdFile, isFile, rewriteFile };
