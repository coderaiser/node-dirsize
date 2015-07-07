# DirSize [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

Copy files with emitter.

## Global

`DirSize` could be installed global with

```
npm i dirsize -g
```

And used this way:

```
Usage: dirsize [path]
Options:
  -h, --help      display this help and exit
  -v, --version   output version information and exit

dirsize /tmp

```

## Local

`dirsize` could be used localy. It will emit event on every size change.

### Install

```
npm i dirsize --save
```

### How to use?

```js
var dirsize         = require('dirsize'),
    cwd             = process.cwd(),
    from            = cwd + '/pipe-io',
    abortOnError    = false;
    
size = dirsize(from);

size.on('size', function(size, currentSize, filename) {
    process.stdout.write('\r' + size);
});

size.on('error', function(error) {
    console.error(percent, ' -> ', name, ':', error.message);
    
    if (abortOnError)
        cp.abort();
});

size.on('end', function() {
});
```

In case of starting example output should be similar to:

```
33%
67%
100%
Copying ended up
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/dirsize.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/node-dirsize/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/gemnasium/coderaiser/node-dirsize.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/dirsize "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/node-dirsize  "Build Status"
[DependencyStatusURL]:      https://gemnasium.com/coderaiser/node-dirsize "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

