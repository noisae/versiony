var End = function(logStrip, object) {

    this.logStrip = logStrip;
    this.object = object;

}

End.prototype.execute = function() {
    this.logStrip()

    var files   = this.object.model.files().slice(),
        version = String(this.object.model.get())

    if (files.length){

        console.log('Done. New version: ' + version)

        this.logStrip()

        console.log('Files updated:\n')

        files.forEach(function(f){
            console.log(f)
        })


    } else {
        console.log('No file updated.')
    }

    this.logStrip()

    this.object.model.reset()

    return {
        version: version,
        files  : files
    }
};

module.exports = End;
