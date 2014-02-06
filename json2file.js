var FS = require('fs')

module.exports = function(file, contents){
    var contents,
        data

    if (typeof contents != 'string'){
        contents = JSON.stringify(contents, null, '    ')
    }

    FS.writeFileSync(file, contents)

    return data
}