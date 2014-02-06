
var file2json = require('./file2json'),
    json2file = require('./json2file')

var versiony = (function(){

    var source,
        sourceJson,
        numbers = [],

        MAJOR,
        MAJOR_INC,

        MINOR,
        MINOR_INC,

        PATCH,
        PATCH_INC,

        FILES = [],

        asSeparate = function(json){
            return ('major' in json) && ('minor' in json) && ('patch' in json)
        },

        asVersion = function(json){
            return 'version' in json
        },

        getNewVersion = function(){
            var value = numbers.slice()

            !value[0] && (value[0] = 0)
            !value[1] && (value[1] = 0)
            !value[2] && (value[2] = 0)

            if (MAJOR_INC){
                value[0]++
            }

            if (MINOR_INC){
                value[1]++
            }

            if (PATCH_INC){
                value[2]++
            }

            return value.map(function(v){
                return parseInt(v, 10)
            })
        },

        to = function(json){

            var value = getNewVersion()

            if (asSeparate(json)){
                json.major = value[0]
                json.minor = value[1]
                json.patch = value[2]
            } else if (asVersion(json)){
                json.version = value.join('.')
            }

            return json
        },

        getVersion = function(json){

            if (typeof json == 'string'){
                json = { version: json }
            }
            var v

            if (asSeparate(json)){
                v = [
                    json.major,
                    json.minor,
                    json.patch
                ]
            } else if (asVersion(json)){
                v = json.version.split('.')

                v.length < 1 && (v[0] = 0)
                v.length < 2 && (v[1] = 0)
                v.length < 3 && (v[2] = 0)

                v.length = 3
            }

            return v
        },

        logStrip = function(){
            console.log('---------------------------------------------')
        }

    return {
        version: function(version){
            version += ''
            numbers = getVersion(version)

            MAJOR   = MINOR = PATCH = MAJOR_INC = MINOR_INC = PATCH_INC = undefined

            return this
        },

        major: function(major){

            if (arguments.length && major != null){
                numbers[0] = major
            } else {
                MAJOR_INC = true
            }

            return this
        },

        minor: function(minor){
            if (arguments.length && minor != null){
                numbers[1] = minor
            } else {
                MINOR_INC = true
            }

            return this
        },

        patch: function(patch){
            if (arguments.length && patch != null){
                numbers[2] = patch
            } else {
                PATCH_INC = true
            }

            return this
        },

        from: function(s, config){
            source = s

            try {
                sourceJson = file2json(source)
            } catch (ex){
                console.log('Could not read source file "' + source + '"! ')
                console.log(ex)

                return this
            }

            numbers    = getVersion(sourceJson)

            if (!numbers){
                console.warn('Version could not be detected from "' + s + '"! Please either ' +
                             'use a "version" key, with a semver string (eg: "1.2.3") or ' +
                             'use "major", "minor" and "patch" keys to specify each semver part separately.'
                             )
            }

            if (!config || !config.skip){
                this.to(s)
            }

            return this
        },

        to: function(file){
            if (!numbers.length){
                console.warn('Please provide a version source file before calling "to"!')
                return this
            }

            if (!file){
                file = source
            }

            if (file === source && getNewVersion().join('.') === numbers.join('.')){
                //log skip same file, since no change detected
                return this
            }

            var json

            try {
                json = file2json(file)
            } catch (ex){
                console.log('\nNo file found at "'+ file + '". Skipping. \n')
                return this
            }

            try {
                json2file(
                    file,
                    to(json)
                )

                FILES.push(file)
            } catch (ex){
                console.log('\nCould not write version to "' + file + '". Skipping. \n')
            }

            return this
        },

        end: function(){
            logStrip()
            console.log('Done. New version: ' + getNewVersion().join('.'))

            logStrip()

            if (FILES.length){

                console.log('Files updated:\n')

                FILES.forEach(function(f){
                    console.log(f)
                })
            } else {
                console.log('No file updated.')
            }

            logStrip()

        }
    }
})()

module.exports = versiony