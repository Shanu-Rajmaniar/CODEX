"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgetest = exports.edittest = exports.deletetest = exports.createtest = exports.runtests = exports.gettests = exports.parse = exports.submit = exports.auto = exports.browse = void 0;
var chalk = require("chalk");
var playwright = require("playwright");
var fs = require("fs");
var fetch_get = require('node-fetch');
require("dotenv").config({ path: __dirname + "/../.env" });
var spawn = require("child_process").spawnSync;
var logSymbols = require("log-symbols");
var boxen = require('boxen');
var openInEditor = require('open-in-editor');
var prompts = require('prompts');
function browse() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright["chromium"].launch({
                        headless: true
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _a.sent();
                    context.setDefaultTimeout(120000);
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://codeforces.com")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.click('text=Enter')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.fill('id=handleOrEmail', process.env.CFUSERNAME)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.fill('id=password', process.env.CFPASSWORD)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.click('input[type=submit]:visible')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('div[class=personal-sidebar]')];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, context.storageState({ path: global.__basedir + "/../state.json" })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.browse = browse;
function auto() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright["chromium"].launch({
                        headless: true
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext({ storageState: global.__basedir + "/../state.json" })];
                case 2:
                    context = _a.sent();
                    context.setDefaultTimeout(120000);
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://codeforces.com")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.auto = auto;
function submit(problemID) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, p, contest, i, ind, fileInput, sub_but, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright["chromium"].launch({
                        headless: false
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext({ storageState: global.__basedir + "/../state.json" })];
                case 2:
                    context = _a.sent();
                    context.setDefaultTimeout(120000);
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    p = problemID;
                    contest = '';
                    for (i = 0; i < p.length; i++) {
                        if (p.charAt(i) <= '9' && p.charAt(i) >= '0') {
                            contest += p.charAt(i);
                        }
                        else {
                            break;
                        }
                    }
                    ind = p.substr(contest.length - p.length);
                    return [4 /*yield*/, page.goto("https://codeforces.com/contest/" + contest + "/problem/" + ind)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.$('input[type=file]')];
                case 5:
                    fileInput = _a.sent();
                    return [4 /*yield*/, page.selectOption('select[name=programTypeId]', '73')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.$('input[value=Submit]')];
                case 7:
                    sub_but = _a.sent();
                    if (fileInput == null || sub_but == null) {
                        console.log("Error - Incorrect Page");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fileInput.setInputFiles(p + ".cpp")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sub_but.click()];
                case 9:
                    _a.sent();
                    val = 1;
                    _a.label = 10;
                case 10:
                    if (!val) return [3 /*break*/, 13];
                    if (val == 0) {
                        return [3 /*break*/, 13];
                    }
                    return [4 /*yield*/, fetch_get("https://codeforces.com/api/contest.status?contestId=" + contest + "&handle=" + process.env.CFUSERNAME).then(function (result) { return result.json(); }).then(function (body) {
                            var obj = body;
                            if (obj.status == 'FAILED') {
                                console.log(obj.comment);
                                return;
                            }
                            console.log(obj.result[0].verdict);
                            if (obj.result[0].verdict != undefined && obj.result[0].verdict != "TESTING") {
                                val = 0;
                                return;
                            }
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (f) { return setTimeout(f, 1500); })];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.submit = submit;
function parse(contest) {
    fetch_get("https://codeforces.com/api/contest.standings?contestId=" + contest + "&from=1&count=1").then(function (result) { return result.json(); }).then(function (body) {
        var obj = body;
        if (obj.status == 'FAILED') {
            console.log(obj.comment);
            return;
        }
        var prob_list = (obj.result).problems;
        var content = "";
        try {
            content = fs.readFileSync(global.__basedir + "/../template.cpp", 'utf8');
        }
        catch (err) {
            console.error(err);
        }
        for (var _i = 0, prob_list_1 = prob_list; _i < prob_list_1.length; _i++) {
            var prob = prob_list_1[_i];
            fs.writeFileSync("./" + (prob.contestId + prob.index) + ".cpp", content, function (err) {
                if (err)
                    throw err;
            });
            gettests(prob.contestId + prob.index);
        }
    });
}
exports.parse = parse;
function gettests(problem) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, p, contest, i, ind, tests_input, tests_output, co, _i, tests_input_1, input, _a, tests_output_1, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, playwright["chromium"].launch({
                        headless: true
                    })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newContext({ storageState: global.__basedir + "/../state.json" })];
                case 2:
                    context = _b.sent();
                    context.setDefaultTimeout(120000);
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _b.sent();
                    p = problem;
                    contest = '';
                    for (i = 0; i < p.length; i++) {
                        if (p.charAt(i) <= '9' && p.charAt(i) >= '0') {
                            contest += p.charAt(i);
                        }
                        else {
                            break;
                        }
                    }
                    ind = p.substr(contest.length - p.length);
                    return [4 /*yield*/, page.goto("https://codeforces.com/contest/" + contest + "/problem/" + ind + "\n\n")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.$$eval('div[class=sample-tests] > div[class=sample-test] > div[class=input]>pre', function (tests) {
                            var data = [];
                            tests.forEach(function (elm) {
                                data.push(elm.innerText);
                            });
                            return data;
                        })];
                case 5:
                    tests_input = _b.sent();
                    return [4 /*yield*/, page.$$eval('div[class=sample-tests] > div[class=sample-test] > div[class=output]>pre', function (tests) {
                            var data = [];
                            tests.forEach(function (elm) {
                                data.push(elm.innerText);
                            });
                            return data;
                        })];
                case 6:
                    tests_output = _b.sent();
                    return [4 /*yield*/, browser.close()];
                case 7:
                    _b.sent();
                    fs.mkdirSync("./testcases/sample_inputs/" + p, { recursive: true }, function (err) {
                        if (err)
                            return (err);
                    });
                    co = 0;
                    _i = 0, tests_input_1 = tests_input;
                    _b.label = 8;
                case 8:
                    if (!(_i < tests_input_1.length)) return [3 /*break*/, 11];
                    input = tests_input_1[_i];
                    return [4 /*yield*/, fs.writeFileSync("./testcases/sample_inputs/" + p + "/" + (p + co) + ".in", input, function (err) {
                            if (err)
                                throw err;
                        })];
                case 9:
                    _b.sent();
                    co++;
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11:
                    co = 0;
                    fs.mkdirSync("./testcases/sample_outputs/" + p, { recursive: true }, function (err) {
                        if (err)
                            return (err);
                    });
                    fs.mkdirSync("./testcases/generated_outputs/" + p, { recursive: true }, function (err) {
                        if (err)
                            return (err);
                    });
                    for (_a = 0, tests_output_1 = tests_output; _a < tests_output_1.length; _a++) {
                        output = tests_output_1[_a];
                        fs.writeFileSync("./testcases/sample_outputs/" + p + "/" + (p + co) + ".out", output, function (err) {
                            if (err)
                                throw err;
                        });
                        co++;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.gettests = gettests;
function runtests(problem) {
    return __awaiter(this, void 0, void 0, function () {
        var p, res, pythonProcess, files, i, file, file_name, ver, pythonProcess, content, sample_output, response, content, sample_output, gen_output, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = problem;
                    try {
                        pythonProcess = spawn('python3', [global.__basedir + "/../src/shell_scripts/compile.py", '.', p, './testcases']);
                        res = String(pythonProcess.stdout);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    if (res != "OK") {
                        console.log(boxen(chalk.bold.yellow(logSymbols.warning + " Compilation Error"), { borderColor: 'yellow', padding: 1, borderStyle: 'bold', float: 'center' }));
                        console.log(res);
                        return [2 /*return*/];
                    }
                    try {
                        files = fs.readdirSync("./testcases/sample_inputs/" + p + "/", { encoding: 'utf-8' });
                    }
                    catch (err) {
                        console.log(err);
                    } //handling error
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 7];
                    file = files[i];
                    file_name = (String(file)).substr(0, (String(file)).length - 3);
                    ver = "";
                    try {
                        pythonProcess = spawn('python3', [global.__basedir + "/../src/shell_scripts/eval.py", '.', p, file_name, './testcases']);
                        ver = String(pythonProcess.stdout);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    if (!(ver == "OK")) return [3 /*break*/, 2];
                    console.log(boxen(chalk.bold.green(logSymbols.success + " Sample Case " + file_name + " Passed"), { borderColor: 'green', padding: 1, borderStyle: 'bold', float: 'center' }));
                    return [3 /*break*/, 6];
                case 2:
                    if (!(ver == "TLE")) return [3 /*break*/, 4];
                    console.log(boxen(chalk.bold.yellow(logSymbols.warning + " Sample Case " + file_name + " Time Limit Exceeded"), { borderColor: 'yellow', padding: 1, borderStyle: 'bold', float: 'center' }));
                    try {
                        content = fs.readFileSync("./testcases/sample_inputs/" + p + "/" + file_name + ".in", { encoding: 'utf8' });
                        console.log(boxen(content, { title: 'Sample Input' }));
                    }
                    catch (err) {
                        console.log(err);
                    }
                    try {
                        sample_output = fs.readFileSync("./testcases/sample_outputs/" + p + "/" + file_name + ".out", { encoding: 'utf8' });
                    }
                    catch (err) {
                        console.log(err);
                    }
                    console.log(boxen(sample_output, { title: 'Sample Output', float: 'left' }));
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'check',
                            message: 'Continue Execution? (Enter y or n)',
                            validate: function (v) { return v != 'y' && v != 'n' ? "Please enter y or n" : true; }
                        })];
                case 3:
                    response = _a.sent();
                    if (response.check != 'y') {
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 6];
                case 4:
                    if (!(ver == "WA")) return [3 /*break*/, 6];
                    console.log(boxen(chalk.bold.red(logSymbols.error + " Sample Case " + file_name + " Failed"), { borderColor: 'red', padding: 1, borderStyle: 'bold', float: 'center' }));
                    try {
                        content = fs.readFileSync("./testcases/sample_inputs/" + p + "/" + file_name + ".in", { encoding: 'utf8' });
                        console.log(boxen(content, { title: 'Sample Input' }));
                    }
                    catch (err) {
                        console.log(err);
                    }
                    try {
                        sample_output = fs.readFileSync("./testcases/sample_outputs/" + p + "/" + file_name + ".out", { encoding: 'utf8' });
                    }
                    catch (err) {
                        console.log(err);
                    }
                    try {
                        gen_output = fs.readFileSync("./testcases/generated_outputs/" + p + "/" + file_name + ".out", { encoding: 'utf8' });
                    }
                    catch (err) {
                        console.log(err);
                    }
                    console.log(boxen(sample_output, { title: 'Sample Output', float: 'left' }));
                    console.log(boxen(gen_output, { title: 'Generated Output', float: 'left' }));
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'check',
                            message: 'Continue Execution? (Enter y or n)',
                            validate: function (v) { return v != 'y' && v != 'n' ? "Please enter y or n" : true; }
                        })];
                case 5:
                    response = _a.sent();
                    if (response.check != 'y') {
                        return [2 /*return*/];
                    }
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.runtests = runtests;
function createtest(problem) {
    var p = problem;
    var editor = openInEditor.configure({
        editor: process.env.EDITOR
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
    fs.mkdirSync("./testcases/sample_inputs/" + p, { recursive: true });
    fs.mkdirSync("./testcases/sample_outputs/" + p, { recursive: true });
    fs.mkdirSync("./testcases/generated_outputs/" + p, { recursive: true });
    var co = (fs.readdirSync("./testcases/sample_inputs/" + p, { encoding: 'utf-8' })).length;
    fs.writeFileSync("./testcases/sample_inputs/" + p + "/" + (p + co) + ".in", "Sample Input\n");
    editor.open("./testcases/sample_inputs/" + p + "/" + (p + co) + ".in").then(function () {
        //console.log('Success!');
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
    fs.writeFileSync("./testcases/sample_outputs/" + p + "/" + (p + co) + ".out", "Sample Output\n");
    editor.open("./testcases/sample_outputs/" + p + "/" + (p + co) + ".out").then(function () {
        //console.log('Success!');
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
}
exports.createtest = createtest;
function deletetest(problem, test) {
    var p = problem;
    var id = test;
    try {
        if (fs.existsSync("./testcases/sample_inputs/" + p + "/" + (p + id) + ".in")) {
            fs.unlinkSync("./testcases/sample_inputs/" + p + "/" + (p + id) + ".in", { recursive: true });
        }
    }
    catch (e) {
        console.log("An error occurred.");
    }
    try {
        if (fs.existsSync("./testcases/sample_outputs/" + p + "/" + (p + id) + ".out")) {
            fs.unlinkSync("./testcases/sample_outputs/" + p + "/" + (p + id) + ".out", { recursive: true });
        }
    }
    catch (e) {
        console.log("An error occurred.");
    }
    try {
        if (fs.existsSync("./testcases/generated_outputs/" + p + "/" + (p + id) + ".out")) {
            fs.unlinkSync("./testcases/generated_outputs/" + p + "/" + (p + id) + ".out", { recursive: true });
        }
    }
    catch (e) {
        console.log("An error occurred.");
    }
    try {
        if (fs.existsSync("./testcases/sample_outputs/" + p) && !(fs.readdirSync("./testcases/sample_outputs/" + p).length)) {
            fs.rmdirSync("./testcases/sample_outputs/" + p);
        }
    }
    catch (e) {
        console.log("An Error Occurred");
    }
    try {
        if (fs.existsSync("./testcases/sample_inputs/" + p) && !(fs.readdirSync("./testcases/sample_inputs/" + p).length)) {
            fs.rmdirSync("./testcases/sample_inputs/" + p);
        }
    }
    catch (e) {
        console.log("An Error Occurred");
    }
    try {
        if (fs.existsSync("./testcases/generated_outputs/" + p) && !(fs.readdirSync("./testcases/generated_outputs/" + p).length)) {
            fs.rmdirSync("./testcases/generated_outputs/" + p);
        }
    }
    catch (e) {
        console.log("An Error Occurred");
    }
}
exports.deletetest = deletetest;
function edittest(problem, test) {
    var p = problem;
    var co = test;
    fs.mkdirSync("./testcases/sample_inputs/" + p, { recursive: true });
    fs.mkdirSync("./testcases/sample_outputs/" + p, { recursive: true });
    fs.mkdirSync("./testcases/generated_outputs/" + p, { recursive: true });
    var editor = openInEditor.configure({
        editor: process.env.EDITOR
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
    editor.open("./testcases/sample_inputs/" + p + "/" + (p + co) + ".in").then(function () {
        //console.log('Success!');
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
    editor.open("./testcases/sample_outputs/" + p + "/" + (p + co) + ".out").then(function () {
        //console.log('Success!');
    }, function (err) {
        console.error('Something went wrong: ' + err);
    });
}
exports.edittest = edittest;
function purgetest(problem) {
    if (problem != undefined) {
        if (fs.existsSync("./testcases/sample_inputs/" + problem)) {
            try {
                fs.rmSync("./testcases/sample_inputs/" + problem, { recursive: true });
            }
            catch (e) {
                console.log("Error");
            }
        }
        if (fs.existsSync("./testcases/sample_outputs/" + problem)) {
            try {
                fs.rmSync("./testcases/sample_outputs/" + problem, { recursive: true });
            }
            catch (e) {
                console.log("Error");
            }
        }
        if (fs.existsSync("./testcases/generated_outputs/" + problem)) {
            try {
                fs.rmSync("./testcases/generated_outputs/" + problem, { recursive: true });
            }
            catch (e) {
                console.log("Error");
            }
        }
    }
    else {
        if (fs.existsSync("./testcases")) {
            try {
                fs.rmSync("./testcases", { recursive: true });
            }
            catch (e) {
                console.log("Error!");
            }
        }
    }
}
exports.purgetest = purgetest;
