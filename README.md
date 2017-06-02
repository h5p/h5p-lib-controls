H5P Library - Controls
==========

[![Build Status](https://travis-ci.org/h5p/h5p-lib-controls.svg?branch=master)](https://travis-ci.org/h5p/h5p-lib-controls)

## Building

Get the [h5p-lib-controls](https://github.com/h5p/h5p-lib-controls), and link it to this project.

```bash
 cd ..
 git clone git@github.com:h5p/h5p-lib-controls.git
 cd h5p-lib-controls
 npm link
 cd ../h5p-hub-client
 npm link h5p-lib-controls
```

## Getting started

Grab all the modules:
```javascript
npm install
```

Run tests:
```javscript
npm test
```

Build distribution
```javscript
npm run build
```