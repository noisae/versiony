var versiony = require('./index')

versiony
    .from('version.json')
    .to('bower.json')
    .to('package.json')
    .end()