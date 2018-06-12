# DirSize [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

Get directory size with emitter.

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
const dirsize = require('dirsize');
const cwd = process.cwd();
const from = cwd + '/pipe-io';
const abortOnError = false;

const size = dirsize(from);

size.on('size', (size, currentSize, filename) => {
    process.stdout.write('\r' + size);
});

size.on('error', (error) => {
    console.error(percent, ' -> ', name, ':', error.message);
    
    if (abortOnError)
        cp.abort();
});

size.on('end', () => {});
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/dirsize.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/node-dirsize/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/node-dirsize.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/dirsize "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/node-dirsize  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/node-dirsize "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

