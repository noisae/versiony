#!/usr/bin/env node

'use strict'

var arguably = require('arguably'),
    args     = arguably
                .option('--major')
                .option('--newmajor')
                .option('--minor')
                .option('--newminor')
                .option('--patch')
                .option('--version')
                .option('--to')
                .parse()

var file     = process.argv[2],
    versiony = require('../v.js')

if (!file || !~file.indexOf('.json')){
    file = 'package.json'
    console.log('Assuming package.json\n')
}

versiony.from(file)

if (args.version){
    versiony.version(args.version)
}

;['major', 'minor', 'patch'].forEach(function(name){

    if (args.hasOwnProperty(name)){
        if (args[name] != null){
            versiony[name](args[name])
        } else {
            versiony[name]()
        }
    }
})

if (args.hasOwnProperty('newmajor')){
    versiony.newMajor()
}
if (args.hasOwnProperty('newminor')){
    versiony.newMinor()
}

versiony.to()

if (args.to){
    args.to.split(',').forEach(function(file){
        versiony.to(file)
    })
}

versiony.end()
