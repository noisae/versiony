versiony
========

Node.js module to increment version number for your code/module

Usage:
-----

Versiony can read code versions from json files containing either the keys "major", "minor", "patch"
```js
    {
        "major": 0,
        "minor": 1,
        "patch": 1
    }
```

or with a "version" key, just like package.json

```js
    {
        "name": "versiony",
        "version": "0.1.1"
    }
```

Example

version.json
```js
    {
        "major": 0,
        "minor": 0,
        "patch": 1
    }
```

test.js
```js
var versiony = require('./index')

versiony

    .minor()                //will cause the minor version to be bumped by 1
    .from('version.json')   //read the version from version.json
    .to()                   //write the version tp the source file (package.json)
                            //with the minor part bumped by 1
    .to('bower.json')       //apply the same version
    .to('package.json')     //apply the same version
    .end()                  //display info on the stdout about modified files
```

The above code will cause the version 0.1.1 to be written to all 3 files, if all are found.

In the case ```versiony``` does not find a file that is specified in the to() call, it just skips it.

Other examples
------------

Set the patch version number to 4. That is, for a current version 1.0.2 will write 1.0.4

```js
    versiony
        .from('package.json')
        .patch(4)
        .to()
```


Take the version in version.json. For this version, set the major version to 1, then write this to package.json and bower.json. So, for version.json containing "4.5.6" the script below will write 1.5.6 to package.json and bower.json. If you also want to update version.json, simply add a .to() call anywhere after the major(1)

```js
    versiony
        .from('version.json')
        .major(1)
        .to('package.json')
        .to('bower.json')
        .end()
```

Copy the version from one file to another

```js
    versiony.from('version.json').to('package.json')
```

Release a new major version
```js
    versiony
        .from('version.json')
            .major()
            .minor(0)
            .patch(0)
        .to()               //also write to the source file (the one specified in from() )
        .to('bower.json')
        .to('package.json')
        .end()
```

Which is equivalent to
```js
    versiony
        .from('version.json')
        .newMajor()
        .to()
        .to('bower.json')
        .to('package.json')
        .end()
```

The flow in the above script is the following

 - take the version from version.json
 - apply the modifications (increment major, set minor and patch to 0)
 - write the new version to the source file (version.json)
 - write the new version to bower.json
 - write the new version to package.json


API
===