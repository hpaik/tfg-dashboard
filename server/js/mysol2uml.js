// NOTE (@gulycat1214): xml raw data extraction is slowing execution!


"use strict";
// code should be used in stric mode

Object.defineProperty(exports, "__esModule", { value: true });

// require the libraries from the Local PATH
// --> /usr/local/lib/node_modules/sol2uml/lib/
const etherscanParser_1 = require("./../node_modules/sol2uml/lib/etherscanParser");
const fileParser_1 = require("./../node_modules/sol2uml/lib/fileParser");
const contractFilter_1 = require("./../node_modules/sol2uml/lib/contractFilter");
const debugControl = require('debug');
const debug = require('debug')('sol2uml');
const program = require('commander');

/*program
    .usage(`<fileFolderAddress> [options]

Generates UML diagrams from Solidity source code.
If no file, folder or address is passes as the first argument, the working folder is used.
When a folder is used, all *.sol files are found in that folder and all sub folders.
If an Ethereum address with a 0x prefix is passed, the verified source code from Etherscan will be used.`)
    .option('-b, --baseContractNames <value>', 'only output contracts connected to these comma separated base contract names')
    .option('-f, --outputFormat <value>', 'output file format: svg, png, dot or all', 'svg')
    .option('-o, --outputFileName <value>', 'output file name')
    .option('-d, --depthLimit <depth>', 'number of sub folders that will be recursively searched for Solidity files. Default -1 is unlimited', -1)
    .option('-n, --network <network>', 'mainnet, ropsten, kovan, rinkeby or goerli', 'mainnet')
    .option('-k, --etherscanApiKey <key>', 'Etherscan API Key')
    .option('-c, --clusterFolders', 'cluster contracts into source folders')
    .option('-v, --verbose', 'run with debugging statements')
    .parse(process.argv);
if (program.verbose) {
    debugControl.enable('sol2uml');
}*/
// This function needs to be loaded after the DEBUG env variable has been set
// const converter_1 = require("/usr/local/lib/node_modules/sol2uml/lib/converter");
const myConverter = require('./myConverter.js');
// function to parse the different UML classes from a .sol file or Etherscan contract



async function umlClassesParser(_fileFolderAddress){
    let fileFolderAddress = _fileFolderAddress;

    // if no path is specified get the current one
    /*if (program.args.length === 0) {
        fileFolderAddress = process.cwd();
    }
    // get the passed path in the terminal
    else {
        fileFolderAddress = program.args[0];
    }*/
    let umlClasses;

    //if the argument passed starts with 0x -> parse the contract code from the etherscan webpage
    if (fileFolderAddress.match(/^0x([A-Fa-f0-9]{40})$/)) {
        debug(`argument ${fileFolderAddress} is an Ethereum address so checking Etherscan for the verified source code`);
        //const etherscanApiKey = program.etherscanApiKey || 'ZAD4UI2RCXCQTP38EXS3UY2MPHFU5H9KB1';
        const etherscanApiKey = 'ZAD4UI2RCXCQTP38EXS3UY2MPHFU5H9KB1';
        //const etherscanParser = new etherscanParser_1.EtherscanParser(etherscanApiKey, program.network);
        const etherscanParser = new etherscanParser_1.EtherscanParser(etherscanApiKey, 'mainnet');
        umlClasses = await etherscanParser.getUmlClasses(fileFolderAddress);
    }
    else {
        //const depthLimit = parseInt(program.depthLimit);
        let url = fileFolderAddress;
        const depthLimit = url.split(/[?#]/).shift().match(/\/[^/]+?/g).length;;
        /*if (isNaN(depthLimit)) {
            console.error(`depthLimit option must be an integer. Not ${program.depthLimit}`);
            process.exit(1);
        }*/
        // parse classes from the local file
        umlClasses = await fileParser_1.parseUmlClassesFromFiles([fileFolderAddress], depthLimit);

    }
    return [umlClasses, fileFolderAddress];
}

// filter in case user uses the option of matching baseContractNames in the terminal

async function filterUmlClasses(_umlClasses){
    let filteredUmlClasses = _umlClasses;
    /*if (program.baseContractNames) {
        const baseContractNames = program.baseContractNames.split(',');
        filteredUmlClasses = contractFilter_1.classesConnectedToBaseContracts(_umlClasses, baseContractNames);

    }*/
    return filteredUmlClasses;
}

// function that generates the .svg file from a set of umlClasses
// Workflow: UML -> dot > svg
async function generateOutputFile(_modifiedumlClasses, _fileFolderAddress){
    let outputFileName = `${_fileFolderAddress}.svg`;
    let rawSvg = await myConverter.generateFilesFromUmlClasses(_modifiedumlClasses, _fileFolderAddress, 'svg', outputFileName, false);
    debug(`Finished`);
    return rawSvg;
}

// function to modify the UML deleting some types of classes / contracts
function modifyUml(_uml, _classStereoType){
    let modified_umlClasses = [];
    let classType;
    let all = false;
    // evaluate the type of class the user wants to hide
    switch (_classStereoType) {
        case 'Library':
            // Library
            classType = 1;
            break;
        case 'Interface':
            // Interface
            classType = 2;
            break;
        case 'Abstract':
            // Abstract
            classType = 3;
            break;
        case 'All':
            // Hide all
            all = true;
            break;
        default:
            // not possible coincidence
            classType = -1;
            break;
    }

    _uml.forEach( function(element) {
            // depending on the user's input we hide some classes, or we hide all of them (2nd condition)
            if(element.stereotype === classType || (all === true && element.stereotype != 0)){
                // we supose we don't want to add the abstract classes, libraries and interfaces
                // umlClass.stereotype === 3 === 'Abstract'
                // umlClass.stereotype === 1 === 'Library'
                // umlClass.stereotype === 2 === 'Interface'
            }else {
                modified_umlClasses.push(element);
            }
    });
    return modified_umlClasses;
}


exports.sol2uml = async (_fileFolderAddress, _contractTypeToHide) =>{
    let variables = await umlClassesParser(_fileFolderAddress);
    let uml = variables[0];
    let path = variables[1];
    let filteredUml = await filterUmlClasses(uml);
    let rawSvg = await generateOutputFile(modifyUml(filteredUml, _contractTypeToHide), path);
    return rawSvg;
};
