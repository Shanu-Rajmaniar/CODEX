import { spawnSync } from "child_process";


const chalk=require("chalk");
const playwright=require("playwright");
const fs=require("fs");
const fetch_get=require('node-fetch');
require("dotenv").config({path:`${__dirname}/../.env`});
const spawn = require("child_process").spawnSync;
const logSymbols=require("log-symbols");
const boxen=require('boxen');
var openInEditor = require('open-in-editor');
const prompts=require('prompts');

export async function browse() {

    const browser=await playwright["chromium"].launch({
        headless:true
    });

    const context=await browser.newContext();

    context.setDefaultTimeout(120000);

    const page=await context.newPage();

    await page.goto("https://codeforces.com");

    await page.click('text=Enter');

    await page.fill('id=handleOrEmail', process.env.CFUSERNAME);

    await page.fill('id=password', process.env.CFPASSWORD);
   
    await page.click('input[type=submit]:visible');
    await page.waitForSelector('div[class=personal-sidebar]');
    await context.storageState({path: `${global.__basedir}/../state.json`});

    await browser.close();

}
export async function auto() {

    const browser=await playwright["chromium"].launch({
        headless:true
    });

    const context=await browser.newContext({storageState:`${global.__basedir}/../state.json`});

    context.setDefaultTimeout(120000);

    const page=await context.newPage();

    await page.goto("https://codeforces.com");
    await browser.close();

}

export async function submit(problemID){
    
    const browser=await playwright["chromium"].launch({
        headless:false
    });

    const context=await browser.newContext({storageState:`${global.__basedir}/../state.json`});

    context.setDefaultTimeout(120000);

    const page=await context.newPage();

    const p=problemID;
    var contest='';

    for(var i=0;i<p.length;i++){

        if(p.charAt(i)<='9'&&p.charAt(i)>='0'){

            contest+=p.charAt(i);
        }else{

            break;
        }
    }

    var ind=p.substr(contest.length-p.length);
    await page.goto(`https://codeforces.com/contest/${contest}/problem/${ind}`);

    const fileInput=await page.$('input[type=file]');
    await page.selectOption('select[name=programTypeId]','73')
    const sub_but=await page.$('input[value=Submit]');

    if(fileInput==null||sub_but==null){

        console.log("Error - Incorrect Page");
        return;
    }

    await fileInput.setInputFiles(`${p}.cpp`);

    await sub_but.click();
    
    //await browser.close();

    var val=1;

    while(val){

        if(val==0){

            break;
        }
        
        await fetch_get(`https://codeforces.com/api/contest.status?contestId=${contest}&handle=${process.env.CFUSERNAME}`).then(
            result=>result.json()
        ).then(body=>{

            const obj=body as any;
                
            if(obj.status=='FAILED'){

                console.log(obj.comment);
                return;
            }

            console.log(obj.result[0].verdict);
            
            if(obj.result[0].verdict!=undefined&&obj.result[0].verdict!="TESTING"){

                val=0;
                return;
            }
        });

        await new Promise(f => setTimeout(f, 1500));
    }
}

export function parse(contest){
    
    fetch_get(`https://codeforces.com/api/contest.standings?contestId=${contest}&from=1&count=1`).then(
            
        result=>result.json()
    ).then(body => {

        const obj=body as any; 
            
        if(obj.status=='FAILED'){

            console.log(obj.comment);
            return;
        }

        var prob_list=(obj.result).problems;

        var content="";

        try {
            content = fs.readFileSync(`${global.__basedir}/../template.cpp`, 'utf8');

        } catch (err) {
            console.error(err);
        }
        for (let prob of prob_list){

            fs.writeFileSync(`./${prob.contestId+prob.index}.cpp`,content, function (err) {
                if (err) throw err;
            });
            gettests(prob.contestId+prob.index);
        }
    })
}

export async function gettests(problem){

    const browser=await playwright["chromium"].launch({
        headless:true
    });

    const context=await browser.newContext({storageState:`${global.__basedir}/../state.json`});

    context.setDefaultTimeout(120000);

    const page=await context.newPage();

    const p=problem;
    var contest='';

    for(var i=0;i<p.length;i++){

        if(p.charAt(i)<='9'&&p.charAt(i)>='0'){

            contest+=p.charAt(i);
        }else{

            break;
        }
    }

    var ind=p.substr(contest.length-p.length);
    await page.goto(`https://codeforces.com/contest/${contest}/problem/${ind}\n\n`);

    const tests_input = await page.$$eval('div[class=sample-tests] > div[class=sample-test] > div[class=input]>pre',tests=>{
        let data:string[]= [];
        tests.forEach(elm => {
            data.push((elm as HTMLElement).innerText);
        });
        return data;
    });

    const tests_output = await page.$$eval('div[class=sample-tests] > div[class=sample-test] > div[class=output]>pre',tests=>{
        let data:string[]= [];
        tests.forEach(elm => {
            data.push((elm as HTMLElement).innerText);
        });
        return data;
    });
    
    await browser.close()
    
    fs.mkdirSync(`./testcases/sample_inputs/${p}`, { recursive: true}, function (err) {
        if (err) return (err);
    });                

    var co=0;

    for (var input of tests_input){

        await fs.writeFileSync(`./testcases/sample_inputs/${p}/${p+co}.in`,input,function (err) {
            if (err) throw err;
        });
        co++;
    }

    co=0;

    fs.mkdirSync(`./testcases/sample_outputs/${p}`, { recursive: true}, function (err) {
        if (err) return (err);
    });                
    
    fs.mkdirSync(`./testcases/generated_outputs/${p}`, { recursive: true}, function (err) {
        if (err) return (err);
    });

    for (var output of tests_output){

        fs.writeFileSync(`./testcases/sample_outputs/${p}/${p+co}.out`,output,function (err) {
            if (err) throw err;
        });
        co++;
    }
    
}

export async function runtests(problem){
    var p=problem;
    var res;
    try{
        const pythonProcess = spawn('python3',[`${global.__basedir}/../src/shell_scripts/compile.py`,'.' ,p,'./testcases' ]);
        res=String(pythonProcess.stdout)
    }catch(e){
        console.log(e);
    }

    if(res!="OK"){
        
        console.log(boxen(chalk.bold.yellow(logSymbols.warning+" Compilation Error"),{borderColor:'yellow',padding:1,borderStyle:'bold',float:'center'}));
        console.log(res);
        return;
    }
    var files;
    try{
        files=fs.readdirSync(`./testcases/sample_inputs/${p}/`,{encoding:'utf-8'})
    }catch(err){
            
        console.log(err);
    }   //handling error
    
    for (var i=0;i<files.length;i++){

        var file=files[i];
        
        var file_name=(String(file)).substr(0,(String(file)).length-3)
        
        var ver="";

        try{
            const pythonProcess = spawn('python3',[`${global.__basedir}/../src/shell_scripts/eval.py`,'.' ,p,file_name,'./testcases']);
            ver=String(pythonProcess.stdout)
        }catch(e){
            console.log(e);
        }
        if(ver=="OK"){

            console.log(boxen(chalk.bold.green(logSymbols.success+" Sample Case "+file_name+" Passed"),{borderColor:'green',padding:1,borderStyle:'bold',float:'center'}));
        }else if(ver=="TLE"){

            console.log(boxen(chalk.bold.yellow(logSymbols.warning+" Sample Case "+file_name+" Time Limit Exceeded"),{borderColor:'yellow',padding:1,borderStyle:'bold',float:'center'}));
            try{
                var content=fs.readFileSync(`./testcases/sample_inputs/${p}/${file_name}.in`, {encoding:'utf8'});
                console.log(boxen(content,{title:'Sample Input'}));
            }catch(err){
                console.log(err);
            }
    
            var sample_output;
            
            try{
                sample_output=fs.readFileSync(`./testcases/sample_outputs/${p}/${file_name}.out`, {encoding:'utf8'});
            }catch(err){
                console.log(err);
            }
            console.log(boxen(sample_output,{title:'Sample Output',float:'left'}));
            const response = await prompts({
                type: 'text',
                name: 'check',
                message: 'Continue Execution? (Enter y or n)',
                validate: v => v != 'y' && v != 'n' ? `Please enter y or n` : true
            });

            if(response.check!='y'){

                return;
            }

        }else if(ver=="WA"){

            console.log(boxen(chalk.bold.red(logSymbols.error+" Sample Case "+file_name+" Failed"),{borderColor:'red',padding:1,borderStyle:'bold',float:'center'}));    
            try{
                var content=fs.readFileSync(`./testcases/sample_inputs/${p}/${file_name}.in`, {encoding:'utf8'});
                console.log(boxen(content,{title:'Sample Input'}));
            }catch(err){
                console.log(err);
            }
    
            var sample_output;
            var gen_output;
            
            try{
                sample_output=fs.readFileSync(`./testcases/sample_outputs/${p}/${file_name}.out`, {encoding:'utf8'});
            }catch(err){
    
                console.log(err);
            }
            try{
                gen_output=fs.readFileSync(`./testcases/generated_outputs/${p}/${file_name}.out`, {encoding:'utf8'});
            }catch(err){
                console.log(err);
            }
    
            console.log(boxen(sample_output,{title:'Sample Output',float:'left'}));
            console.log(boxen(gen_output,{title:'Generated Output',float:'left'}));
            const response = await prompts({
                type: 'text',
                name: 'check',
                message: 'Continue Execution? (Enter y or n)',
                validate: v => v != 'y' && v != 'n' ? `Please enter y or n` : true
            });

            if(response.check!='y'){

                return;
            }
        }
    }
        
}

export function createtest(problem){
    var p=problem;

    var editor = openInEditor.configure({
        
        editor:process.env.EDITOR
    }, function(err) {
        
        console.error('Something went wrong: ' + err);
    });

        
    fs.mkdirSync(`./testcases/sample_inputs/${p}`,{recursive:true});
    fs.mkdirSync(`./testcases/sample_outputs/${p}`,{recursive:true});
    fs.mkdirSync(`./testcases/generated_outputs/${p}`,{recursive:true});

    var co=(fs.readdirSync(`./testcases/sample_inputs/${p}`,{encoding:'utf-8'})).length;

    fs.writeFileSync(`./testcases/sample_inputs/${p}/${p+co}.in`,"Sample Input\n");
    editor.open(`./testcases/sample_inputs/${p}/${p+co}.in`).then(function() {
        //console.log('Success!');
    }, function(err) {
        console.error('Something went wrong: ' + err);
    });

    fs.writeFileSync(`./testcases/sample_outputs/${p}/${p+co}.out`,"Sample Output\n");
    editor.open(`./testcases/sample_outputs/${p}/${p+co}.out`).then(function() {
        //console.log('Success!');
    }, function(err) {
        console.error('Something went wrong: ' + err);
    });
}

export function deletetest(problem,test){
    var p=problem;
    var id=test;
    
    try {
        if (fs.existsSync(`./testcases/sample_inputs/${p}/${p+id}.in`)) {
            fs.unlinkSync(`./testcases/sample_inputs/${p}/${p+id}.in`,{recursive:true});
        }

    } catch(e) {
        console.log("An error occurred.")
    }

    try {
        if (fs.existsSync(`./testcases/sample_outputs/${p}/${p+id}.out`)) {
            fs.unlinkSync(`./testcases/sample_outputs/${p}/${p+id}.out`,{recursive:true});
        }
        
    } catch(e) {
        console.log("An error occurred.")
    }

    try {
        if (fs.existsSync(`./testcases/generated_outputs/${p}/${p+id}.out`)) {
            fs.unlinkSync(`./testcases/generated_outputs/${p}/${p+id}.out`,{recursive:true});
        }
        
    } catch(e) {
        console.log("An error occurred.")
    }

    try{

        if(fs.existsSync(`./testcases/sample_outputs/${p}`)&&!(fs.readdirSync(`./testcases/sample_outputs/${p}`).length)){

            fs.rmdirSync(`./testcases/sample_outputs/${p}`);
        }
        
    } catch(e) {

        console.log("An Error Occurred")
    }

    try{

        if(fs.existsSync(`./testcases/sample_inputs/${p}`)&&!(fs.readdirSync(`./testcases/sample_inputs/${p}`).length)){

            fs.rmdirSync(`./testcases/sample_inputs/${p}`);
        }
        
    } catch(e) {

        console.log("An Error Occurred")
    }

    try{

        if(fs.existsSync(`./testcases/generated_outputs/${p}`)&&!(fs.readdirSync(`./testcases/generated_outputs/${p}`).length)){

            fs.rmdirSync(`./testcases/generated_outputs/${p}`);
        }
        
    } catch(e) {

        console.log("An Error Occurred")
    }
}

export function edittest(problem,test){ 
    var p=problem;
    var co=test;

    fs.mkdirSync(`./testcases/sample_inputs/${p}`,{recursive:true});
    fs.mkdirSync(`./testcases/sample_outputs/${p}`,{recursive:true});
    fs.mkdirSync(`./testcases/generated_outputs/${p}`,{recursive:true});

    var editor = openInEditor.configure({
        
        editor:process.env.EDITOR
    }, function(err) {
        
        console.error('Something went wrong: ' + err);
    });

    editor.open(`./testcases/sample_inputs/${p}/${p+co}.in`).then(function() {
        //console.log('Success!');
    }, function(err) {
        console.error('Something went wrong: ' + err);
    });

    editor.open(`./testcases/sample_outputs/${p}/${p+co}.out`).then(function() {
        //console.log('Success!');
    }, function(err) {
        console.error('Something went wrong: ' + err);
    });
}

export function purgetest(problem){

    if(problem!=undefined){

        if(fs.existsSync(`./testcases/sample_inputs/${problem}`)){

            try{
                fs.rmSync(`./testcases/sample_inputs/${problem}`,{recursive:true});
            }catch(e){

                console.log("Error");
            }
        }

        if(fs.existsSync(`./testcases/sample_outputs/${problem}`)){

            try{
                fs.rmSync(`./testcases/sample_outputs/${problem}`,{recursive:true});
            }catch(e){

                console.log("Error");
            }
        }

        if(fs.existsSync(`./testcases/generated_outputs/${problem}`)){

            try{
                fs.rmSync(`./testcases/generated_outputs/${problem}`,{recursive:true});
            }catch(e){

                console.log("Error");
            }
        }
        
    }else{

        if(fs.existsSync(`./testcases`)){

            try{
                fs.rmSync(`./testcases`,{recursive:true});
            }catch(e){

                console.log("Error!");
            }
        }
    }
}