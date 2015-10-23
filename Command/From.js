var From = function(source, file2json, getVersion, versiony) {
    this.source = source;
    this.file2json = file2json;
    this.getVersion = getVersion;
    this.versiony = versiony;
}

From.prototype.execute = function() {

    try {
        sourceJson = this.file2json(this.source)
    } catch (ex){
        console.log('Could not read source file "' + this.source + '"! ')
        console.log(ex)

        return this.versiony;
    }
    
    var version = this.getVersion(sourceJson);
    if (!version){
        console.warn('Version could not be detected from "' + this.source + '"! Please either ' +
                     'use a "version" key, with a semver string (eg: "1.2.3") or ' +
                     'use "major", "minor" and "patch" keys to specify each semver part separately.'
                     )
        return this.versiony;
    }

    this.versiony.model.set(version);
    this.versiony.initial = String(this.versiony.model);

    return this.versiony;
};

module.exports = From;
