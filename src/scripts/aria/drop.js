import {setAttribute, hasAttribute} from 'utils/elements';
import {compose, forEach, filter} from 'utils/functional';

/**
 * @type {string}
 * @readonly
 */
const ATTRIBUTE_ARIA_DROPEFFECT = 'aria-dropeffect';

/**
 * @type {function} setDropEffectNone
 */
const setDropEffectNone = setAttribute(ATTRIBUTE_ARIA_DROPEFFECT, 'none');

/**
 * @type {function} setDropEffectNone
 */
const setDropEffectMove = setAttribute(ATTRIBUTE_ARIA_DROPEFFECT, 'move');

/**
 * @type {function} filterHasAttributeDropEffect
 */
const filterHasAttributeDropEffect = filter(hasAttribute(ATTRIBUTE_ARIA_DROPEFFECT));

/**
 * Sets all drop zones to move
 * @param {HTMLElement[]} elements
 * @type {function} setDropZoneEffectsToMove
 */
const setAllDropEffectsToMove = compose(forEach(setDropEffectMove), filterHasAttributeDropEffect);

/**
 * Sets all drop zones to none
 * @param {HTMLElement[]} elements
 * @type {function} setAllDropEffectsToNone
 */
const setAllDropEffectsToNone = compose(forEach(setDropEffectNone), filterHasAttributeDropEffect);

/**
 * Class for handling Drop Zones
 *
 * @class
 */
export default class Drop {
  /**
   * Inits this class
   * @param {Controls} controls
   */
  init(controls) {
    /**
     * @type {Controls}
     */
    this.controls = controls;
  };

  /**
   * On elements with aria-dropeffect, set aria-dropeffect to 'move'
   * @public
   */
  setAllToMove() {
    setAllDropEffectsToMove(this.controls.elements);
  }

  /**
   * On elements with aria-dropeffect, set aria-dropeffect to 'none'
   * @public
   */
  setAllToNone() {
    setAllDropEffectsToNone(this.controls.elements);
  }
}

/**
 * Enum for ARIA drop effects
 * @readonly
 * @enum {string}
 */
Drop.DropEffect = {
  COPY: 'copy',
  MOVE: 'move',
  EXECUTE: 'execute',
  POPUP: 'popup',
  NONE: 'none'
};