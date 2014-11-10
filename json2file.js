var FS = require('fs')

module.exports = function(file, contents, indent){
    var data

    if (indent == null) {
        indent = '    '
    }

    if (typeof contents != 'string'){
        contents = JSON.stringify(contents, null, indent)
    }

    FS.writeFileSync(file, contents)

    return data
}