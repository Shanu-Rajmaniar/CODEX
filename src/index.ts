#!/usr/bin/env node

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

import {submit} from './functions.js'
import {browse} from './functions.js'
import {auto} from './functions.js'
import {parse} from './functions.js'
import {gettests} from './functions.js'
import {runtests} from './functions.js'
import {createtest} from './functions.js'
import {edittest} from './functions.js'
import {deletetest} from './functions.js'
import {purgetest} from './functions.js'

global.__basedir=__dirname;

const yargs=require("yargs");
const prompts=require("prompts");


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
    handler() {
    
        browse();
    }
})

yargs.command({
    command: 'auto',
    describe: 'Test Auto Login',

  
    // Function for your command
    handler() {
        auto();
    }
})
yargs.command({
    command: 'submit',
    describe: 'Submit Problem Solution',
    builder: {
        problemID: {
            describe: 'Problem ID',
            demandOption: true,  // Required
            type: 'string'     
        },
    },
  
    // Function for your command
    handler(argv){

        submit(argv.problemID);
    }
})

yargs.command({
    command: 'parse',
    describe: 'Parse Contest',
    builder: {
        contest: {
            describe: 'Contest',
            demandOption: true,  // Required
            type: 'string'     
        },
    },
  
    // Function for your command
    handler(argv) {
          
        parse(argv.contest);
    }
})

yargs.command({
    command: 'gettest',
    describe: 'Get Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,  // Required
            type: 'string'     
        },
    },
  
    // Function for your command
    handler(argv) {
          
        gettests(argv.problem);
    }
})

yargs.command({

    command: 'runtest',
    describe: 'Run Tests',
    builder: {
        problem: {

            describe:'Problem',
            demandOption:true,
            type:'string'
        }
    },

    handler(argv){

        runtests(argv.problem);

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
})

//Create test cases

yargs.command({
    command: 'createtest',
    describe: 'Create Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,  // Required
            type: 'string'     
        },
    },
  
    // Function for your command
    handler(argv) {
        
        createtest(argv.problem);
    }
})

yargs.command({
    command: 'deletetest',
    describe: 'Delete Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,  // Required
            type: 'string'     
        },
        test: {

            describe: 'Test Number',
            demandOption:true,
            type: 'int'
        }
    },
  
    // Function for your command
    handler(argv) {
        
        deletetest(argv.problem,argv.test);
    }
})

yargs.command({
    command: 'edittest',
    describe: 'Edit Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: true,  // Required
            type: 'string'     
        },
        test: {
            describe: 'Test Number',
            demandOption: true,  // Required
            type: 'int'
        }
    },
  
    // Function for your command
    handler(argv) {
        
        edittest(argv.problem,argv.test);
    }
})

yargs.command({
    command: 'purgetest',
    describe: 'Clear All Test Cases',
    builder: {
        problem: {
            describe: 'Problem',
            demandOption: false,  // Required
            type: 'string'     
        }
    },
  
    // Function for your command
    handler(argv) {
        
        purgetest(argv.problem);           
    }
})


yargs.parse();