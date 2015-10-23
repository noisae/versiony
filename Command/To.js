var To = function(model, initial, file2json, json2file, version2json, source, indent) {
    this.model = model;
    this.initial = initial;
    this.file2json = file2json;
    this.json2file = json2file;
    this.version2json = version2json;
    this.source = source;
    this.indent = indent;
}

To.prototype.execute =  function(file) {
    
    if (!file){
        file = this.source
    }

    if (file == this.source && String(this.model.get()) == this.initial ){
        //skip same file, no change detected
        return this
    }

    if (!file){
        return this
    }

    var json

    try {
        json = this.file2json(file)        
    } catch (ex){
        console.log('\nNo file found at "'+ file + '". Skipping. \n')
        return this
    }

    try {        
        if (!this.model.hasFile(file)){
            this.model.file(file)
            this.json2file(
                file,
                this.version2json(this.model, json),
                this.indent
            )
        }
    } catch (ex){
        console.log('\nCould not write version to "' + file + '". Skipping. \n')
    }

    return this
}

module.exports = To;