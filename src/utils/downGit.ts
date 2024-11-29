import chalk from "chalk";
import ora from "ora";
import download from 'download-git-repo'

const downGit  = (gitRepo:string,dest:string)=>{
    return new Promise<void>((res,rej)=>{
        const startTime = process.hrtime()
        const spinner = ora().start()
        spinner.text = chalk.cyan(`开始下载 ${gitRepo} 文件`)
        download(gitRepo,dest,{clone:true},err=>{
            err?spinner.fail(chalk.red(`\n${gitRepo} 下载失败`)):spinner.succeed(chalk.green(`\n${gitRepo}文件已下载`))
            const usedTime = process.hrtime(startTime)[0].toFixed()
            console.log(chalk.yellowBright(`用时：${usedTime}秒`));
            err?rej(err):res();
        })
    })
}
export {downGit}