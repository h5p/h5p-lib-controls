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
```bash
npm install
```

Run tests:
```bash
npm test
```

Build distribution
```bash
npm run build
```

## Usage

### Keyboard navigation

To get keyboard navigation using arrow keys between elements you can do the following:

```javascript
import Controls from 'h5p-lib-controls/src/scripts/controls';
import UIKeyboard from 'h5p-lib-controls/src/scripts/ui/keyboard';

// Add support for arrow keys + HOME + END
const controls =  new Controls([new UIKeyboard()]);

// Add support for ENTER and SPACE
this.controls.on('select', event => console.log('user selected element', event.element));

// Add support for ESC
this.controls.on('close', event => console.log('perform closing action'));
```

### Using [tabindex="-1"]

By default *h5p-lib-controls* will remove `[tabindex]` from the elements that are not selected. If you instead want to use `[tabindex="-1"]`, you can do the following:

```javascript
const controls =  new Controls([new UIKeyboard()]);
controls.negativeTabIndexAllowed = true;

...
```
