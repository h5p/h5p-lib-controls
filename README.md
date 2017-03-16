H5P SDK UI
==========

[![Build Status](https://travis-ci.org/h5p/h5p-sdk-ui.svg?branch=master)](https://travis-ci.org/h5p/h5p-sdk-ui)

## Building

Get the [h5p-sdk](https://github.com/h5p/h5p-sdk), and link it to this project.

```bash
 cd ..
 git clone git@github.com:h5p/h5p-sdk.git
 cd h5p-sdk
 npm link
 cd ../h5p-hub-client
 npm link h5p-sdk
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