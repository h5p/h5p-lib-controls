import {attributeEquals, hasAttribute, setAttribute} from '../utils/elements';
import {compose, forEach, filter, some} from '../utils/functional';

/**
 * @type {string}
 * @readonly
 */
const ATTRIBUTE_ARIA_GRABBED = 'aria-grabbed';

/**
 * @type {function} setGrabbedTrue
 * @param {HTMLElement} element
 */
const setGrabbed = setAttribute(ATTRIBUTE_ARIA_GRABBED);

/**
 * @type {function} isGrabbed
 * @param {HTMLElement} element
 */
const isGrabbed = attributeEquals(ATTRIBUTE_ARIA_GRABBED, 'true');

/**
 * @type {function} filterHasAttributeDropEffect
 */
const filterHasAttributeGrabbed = filter(hasAttribute(ATTRIBUTE_ARIA_GRABBED));

/**
 * Sets all aria-grabbed to 'false'
 * @param {HTMLElement[]} elements
 * @type {function} setAllGrabbedToFalse
 */
const setAllGrabbedToFalse = compose(forEach(setAttribute(ATTRIBUTE_ARIA_GRABBED, 'false')), filterHasAttributeGrabbed);

/**
 * @type {function} hasGrabbed
 * @param {HTMLElement[]} elements
 */
const hasGrabbed = compose(some(isGrabbed), filterHasAttributeGrabbed);

/**
 * @class
 */
export default class Drag {
  /**
   * Inits this class
   *
   * @param {Controls} controls
   */
  init(controls) {
    /**
     * @type {Controls}
     */
    this.controls = controls;

    // handle select event
    this.controls.on('select', this.select, this);
  };

  /**
   * Marks element as aria-grabbed = 'false' and adds to controller
   *
   * @param element
   */
  addElement(element) {
    setGrabbed('false', element);
    this.controls.addElement(element);
  }

  /**
   * Sets aria-grabbed to 'false' for all elements that has it
   */
  setAllGrabbedToFalse() {
    setAllGrabbedToFalse(this.controls.elements);
  }

  /**
   * Returns true if any of the elements are grabbed
   *
   * @return {boolean}
   */
  hasAnyGrabbed() {
    return hasGrabbed(this.controls.elements)
  }

  /**
   * Un selects all, but selects new element if not already selected
   *
   * @param {HTMLElement} element
   */
  select({element}) {
    const alreadyGrabbed = isGrabbed(element);

    this.setAllGrabbedToFalse();

    if(!alreadyGrabbed) {
      setGrabbed('true', element);
    }
  }
}