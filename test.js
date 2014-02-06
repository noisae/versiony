var versiony = require('./index')

versiony
    .from('version.json')
    .to('package.json')
    .end()