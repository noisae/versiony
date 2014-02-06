var versiony = require('./index')

versiony
    // .patch()
    .from('version.json')
    .minor(2)
    .patch(2)
    .newMajor()
    .to('package.json')
    .to('bower.json')
    .to()
    .end()