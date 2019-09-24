import {Keys, onKey} from './keys'

/**
 * Handle click events for elements not natively handling enter & space key as click
 * @param {jQuery} $element
 * @param {Function} callback
 * @param {Object}
 */
export const onClick = ($element, callback, {ignoreKeyboard = false, preventDefault = true} = {}) => {

  const doCallback = (event) => {
    if (preventDefault) {
      event.preventDefault();
    }
    callback(event);
  };

  // Listen to mouseclicks
  $element.click(doCallback);

  if (ignoreKeyboard !== true) {
    // Listen to space + enter
    onKey($element, [
      {key: Keys.SPACE},
      {key: Keys.ENTER}
    ], doCallback);
  }
};
