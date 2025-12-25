#!/usr/bin/env node
import { Command } from 'commander';
import { monorepo } from './module/monorepo.js';
import { express } from './module/express.js';
import { next } from './module/next.js';
import { react } from './module/react.js';
const cmd = new Command();
cmd.useCmd = function (cmd) {
    cmd && cmd(this);
};
cmd.version('1.0.0');
/* 命令行模块 */
cmd.useCmd(monorepo);
cmd.useCmd(express);
cmd.useCmd(next);
cmd.useCmd(react);
cmd.parse();
