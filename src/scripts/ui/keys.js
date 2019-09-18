// A key-to-keycode map:
export const Keys = {
  ENTER: 13,
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};

/**
 * Check if a jQuery event is triggered by certain keys
 * @param  {jQuery.Event} event
 * @param  {number[]} keys
 * @param  {Object} control Supports checking if ctrl and/or shift is currently active
 * @return {boolean}
 */
export const isKey = (event, keys, control = {ctrl: false, shift: false}) => {
  if (keys.indexOf(event.which) === -1) {
    return false;
  }

  if (control.ctrl && !event.ctrlKey) {
    return false;
  }

  if (control.shift && !event.shiftKey) {
    return false;
  }

  return true;
};

/**
 * Check if a jQuery event is triggered by ENTER or SPACE
 * @param {jQuery.Event} event
 * @return {boolean}
 */
export const isSpaceOrEnterKey = (event) => {
  return [Keys.ENTER, Keys.SPACE].indexOf(event.which) !== -1;
};

/**
 * Listen for certain keys, and trigger listener
 * @param  {jQuery} $element Element to listen on
 * @param  {Object[]} keys Example: {key: keycode, ctrl: true/false, shift: true/false}
 * @param  {Function} callback
 */
export const onKey = ($element, keys, callback) => {
  $element.on('keydown', (event) => {
    for (let i = 0; i < keys.length; i++) {
      const keySetup = keys[i];

      if (isKey(event, [keySetup.key], {ctrl: keySetup.ctrl, shift: keySetup.shift})) {
        if (keySetup.preventDefault) {
          event.preventDefault();
        }
        return callback(event);
      }
    }
  });
};
