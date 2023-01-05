#!/usr/bin/env node
"use strict";
/*import fetch from "node-fetch";
import * as chalk from "chalk";
import * as clear from "clear";
import * as figlet from "figlet";
import * as path from "path";
import * as program from "commander";
import * as yargs from "yargs";
import * as playwright from "playwright";
import * as fs from "fs";
import * as https from "https";
import { string } from "yargs";*/
Object.defineProperty(exports, "__esModule", { value: true });
var functions_js_1 = require("./functions.js");
var functions_js_2 = require("./functions.js");
var functions_js_3 = require("./functions.js");
var functions_js_4 = require("./functions.js");
var functions_js_5 = require("./functions.js");
var functions_js_6 = require("./functions.js");
var functions_js_7 = require("./functions.js");
var functions_js_8 = require("./functions.js");
var functions_js_9 = require("./functions.js");
var functions_js_10 = require("./functions.js");
global.__basedir = __dirname;
var yargs = require("yargs");
var prompts = require("prompts");
/*clear();
console.log(
  chalk.red(
    figlet.textSync('CP App-cli', { horizontalLayout: 'full' })
  )
);*/
yargs.command({
    command: 'browse',
    describe: 'Test Browser',
    /*builder: {
        firstNumber: {
            describe: 'First Number',
            demandOption: true,  // Required
            type: 'number'
        },
        secondNumber: {
            describe: 'Second Number',
            demandOption: true,
            type: 'number'
        }
    },*/
    // Function for your command
    handler: function () {
        (0, functions_js_2.browse)();
    }
});
yargs.command({
    command: 'auto',
    describe: 'Test Auto Login',
    // Function for your command
    handler: function () {
        (0, functions_js_3.auto)();
    }
});
yargs.command({
    command: 'submit',
    describe: 'Submit Problem Solution',
    builder: {
        problemID: {
            describe: 'Problem ID',
            demandOption: true,
            type: 'string'
        },
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_1.submit)(argv.problemID);
    }
});
yargs.command({
    command: 'parse',
    describe: 'Parse Contest',
    builder: {
        contest: {
            describe: 'Contest',
            demandOption: true,
            type: 'string'
        },
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_4.parse)(argv.contest);
    }
});
yargs.command({
    command: 'gettest',
    describe: 'Get Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,
            type: 'string'
        },
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_5.gettests)(argv.problem);
    }
});
yargs.command({
    command: 'runtest',
    describe: 'Run Tests',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        (0, functions_js_6.runtests)(argv.problem);
        /*(async () => {
            const response = await prompts({
              type: 'number',
              name: 'value',
              message: 'How old are you?',
              validate: value => value < 18 ? `Nightclub is 18+ only` : true
            });
          
            console.log(response); // => { value: 24 }
        })();*/
    }
});
//Create test cases
yargs.command({
    command: 'createtest',
    describe: 'Create Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,
            type: 'string'
        },
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_7.createtest)(argv.problem);
    }
});
yargs.command({
    command: 'deletetest',
    describe: 'Delete Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,
            type: 'string'
        },
        test: {
            describe: 'Test Number',
            demandOption: true,
            type: 'int'
        }
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_9.deletetest)(argv.problem, argv.test);
    }
});
yargs.command({
    command: 'edittest',
    describe: 'Edit Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,
            type: 'string'
        },
        test: {
            describe: 'Test Number',
            demandOption: true,
            type: 'int'
        }
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_8.edittest)(argv.problem, argv.test);
    }
});
yargs.command({
    command: 'purgetest',
    describe: 'Clear All Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: false,
            type: 'string'
        }
    },
    // Function for your command
    handler: function (argv) {
        (0, functions_js_10.purgetest)(argv.problem);
    }
});
yargs.parse();
