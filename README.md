H5P Library - Controls
==========

[![Build Status](https://travis-ci.org/h5p/h5p-lib-controls.svg?branch=master)](https://travis-ci.org/h5p/h5p-lib-controls)

## Getting started

Grab all the module:
```bash
npm i --save-development h5p-lib-controls
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
controls.on('select', event => console.log('user selected element', event.element));

// Add support for ESC
controls.on('close', event => console.log('perform closing action'));
```

### Drag and drop

```javascript
import Controls from 'h5p-lib-controls/src/scripts/controls';
import AriaDrag from 'h5p-lib-controls/src/scripts/aria/drag';
import AriaDrop from 'h5p-lib-controls/src/scripts/aria/drop';
import UIKeyboard from 'h5p-lib-controls/src/scripts/ui/keyboard';

// trigger [aria-grabbed="true"] with keyboard
const dragControls = new Controls([new UIKeyboard(), new AriaDrag()]);

// trigger [aria-dropeffect="move"] with keyboard
const dropControls = new Controls([new UIKeyboard(), new AriaDrop()]);
```

### Using negative tabindex

By default *h5p-lib-controls* will remove `[tabindex]` from the elements that are not selected. If you instead want to use `[tabindex="-1"]`, you can do the following:

```javascript
const controls =  new Controls([new UIKeyboard()]);
controls.useNegativeTabIndex();
...
```
