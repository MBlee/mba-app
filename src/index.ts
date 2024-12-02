#!/usr/bin/env node

import {Command} from 'commander'
// import inquirer from 'inquirer'
// import ora from 'ora'
import chalk from 'chalk'
import clipboard from 'clipboardy'

import {help} from './module/help.js'
import {express} from './module/express.js'
import {next} from './module/next.js'
import {react} from './module/react.js'

interface TCMD extends Command{
	useCmd?:(cmd:any)=>void
}
const cmd:TCMD = new Command()
cmd.useCmd = function(cmd){
	cmd && cmd(this)
}
cmd.version('1.0.0')

/* 命令行模块 */
cmd.useCmd(help)
cmd.useCmd(express)
cmd.useCmd(next)
cmd.useCmd(react)

cmd.parse()