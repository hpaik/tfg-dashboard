"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotGenerator_1 = require("./myDotGenerator.js");
const fs_1 = require("fs");
const path = require('path');
const debug = require('debug')('sol2uml');
const converter_1 = require("./../node_modules/sol2uml/lib/converter");
const umlClass_1 = require("./../node_modules/sol2uml/lib/umlClass");

exports.generateFilesFromUmlClasses = async (umlClasses, outputBaseName, outputFormat = 'svg', outputFilename, clusterFolders = false) => {
    const dot = convertUmlClasses2Dot(umlClasses, clusterFolders);
    if (outputFormat === 'dot' || outputFormat === 'all') {
        converter_1.writeDot(dot, outputFilename);
        // No need to continue if only generating a dot file
        if (outputFormat === 'dot') {
            return;
        }
    }
    if (!outputFilename) {
        // If all output then extension is svg
        const outputExt = outputFormat === 'all' ? 'svg' : outputFormat;
        // if outputBaseName is a folder
        try {
            const folderOrFile = fs_1.lstatSync(outputBaseName);
            if (folderOrFile.isDirectory()) {
                const parsedDir = path.parse(process.cwd());
                outputBaseName = path.join(process.cwd(), parsedDir.name);
            }
        }
        catch (err) { } // we can ignore errors as it just means outputBaseName is not a folder
        outputFilename = outputBaseName + '.' + outputExt;
    }
    const svg = converter_1.convertDot2Svg(dot);
    // write svg file even if only wanting png file as we generateFilesFromUmlClasses svg files to png
    // await converter_1.writeSVG(svg, outputFilename, outputFormat);
    /*if (outputFormat === 'png' || outputFormat === 'all') {
        await converter_1.writePng(svg, outputFilename);
    }*/

    //return the svg so it can be treated as raw xml code
    return svg;
};

function convertUmlClasses2Dot(umlClasses, clusterFolders = false) {
    let dotString = `
digraph UmlClassDiagram {
rankdir=BT
color=black
arrowhead=open
node [shape=record, style=filled, fillcolor=gray95]`;
    // Sort UML Classes by folder of source file
    const umlClassesSortedBySourceFiles = sortUmlClassesBySourceFolder(umlClasses);
    let sourceFolder = '';
    for (const umlClass of umlClassesSortedBySourceFiles) {
        if (sourceFolder !== umlClass.codeSource) {
            // Need to close off the last subgraph if not the first
            if (sourceFolder != '') {
                dotString += '\n}';
            }
            dotString += `
subgraph ${getSubGraphName(clusterFolders)} {
label="${umlClass.codeSource}"`;
            sourceFolder = umlClass.codeSource;
        }
        dotString += dotGenerator_1.dotUmlClass(umlClass);
    }
    // Need to close off the last subgraph if not the first
    if (sourceFolder != '') {
        dotString += '\n}';
    }
    dotString += addAssociationsToDot(umlClasses);
    // Need to close off the last the digraph
    dotString += '\n}';
    debug(dotString);
    return dotString;
}

function sortUmlClassesBySourceFolder(umlClasses) {
    return umlClasses.sort((a, b) => {
        if (a.codeSource < b.codeSource) {
            return -1;
        }
        if (a.codeSource > b.codeSource) {
            return 1;
        }
        return 0;
    });
}

let subGraphCount = 0;
function getSubGraphName(clusterFolders = false) {
    if (clusterFolders) {
        return ` cluster_${subGraphCount++}`;
    }
    return ` graph_${subGraphCount++}`;
}
function addAssociationsToDot(umlClasses) {
    let dotString = '';
    let nameToIdMap = {};
    for (const umlClass of umlClasses) {
        nameToIdMap[umlClass.name] = umlClass;
    }
    // for each class
    for (const sourceUmlClass of umlClasses) {
        // for each association in that class
        for (const association of Object.values(sourceUmlClass.associations)) {
            // find the target class
            const targetUmlClass = nameToIdMap[association.targetUmlClassName];
            if (targetUmlClass) {
                dotString += addAssociationToDot(sourceUmlClass, targetUmlClass, association);
            }
        }
    }
    return dotString;
}
exports.addAssociationsToDot = addAssociationsToDot;
function addAssociationToDot(sourceUmlClass, targetUmlClass, association) {
    let dotString = `\n${sourceUmlClass.id} -> ${targetUmlClass.id} [
    id="${sourceUmlClass.name}To${targetUmlClass.name}" `;
    if (association.referenceType == umlClass_1.ReferenceType.Memory ||
        association.realization &&
            targetUmlClass.stereotype === umlClass_1.ClassStereotype.Interface) {
        dotString += 'style=dashed, ';
    }
    if (association.realization) {
        dotString += 'arrowhead=empty, arrowsize=3, ';
        if (!targetUmlClass.stereotype) {
            dotString += 'weight=4, ';
        }
        else {
            dotString += 'weight=3, ';
        }
    }
    return dotString + ']';
}
