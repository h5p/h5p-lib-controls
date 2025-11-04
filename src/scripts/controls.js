import { setAttribute, removeAttribute, hasAttribute } from './utils/elements';
import { forEach, without } from './utils/functional';
import { Eventful } from './mixins/eventful';

/**
 * Controls Event
 * @typedef {Object} ControlsEvent
 * @property {HTMLElement} element
 * @property {number} index
 * @property {HTMLElement[]} elements
 * @property {HTMLElement} oldElement
 */
/**
 * Add element event
 * @event Controls#addElement
 * @type ControlsEvent
 */
/**
 * Remove element event
 * @event Controls#removeElement
 * @type ControlsEvent
 */
/**
 * Previous element event
 * @event Controls#previousElement
 * @type ControlsEvent
 */
/**
 * Next element event
 * @event Controls#nextElement
 * @type ControlsEvent
 */
/**
 * Select option event
 * @event Controls#select
 * @type ControlsEvent
 */
/**
 * Close event
 * @event Controls#close
 * @type ControlsEvent
 */
/**
 * Drag element event
 * @event Controls#drag
 * @type ControlsEvent
 */

/**
 * @type {function} removeTabIndex
 */
const removeTabIndex = removeAttribute('tabindex');
/**
 * @type {function} removeTabIndexForAll
 */
const removeTabIndexForAll = forEach(removeTabIndex);
/**
 * @type {function} setTabIndexZero
 */
const setTabIndexZero = setAttribute('tabindex', '0');
/**
 * @type {function} setTabIndexMinusOne
 */
const setTabIndexMinusOne = setAttribute('tabindex', '-1');
/**
 * @type {function} hasTabIndex
 */
const hasTabIndex = hasAttribute('tabindex');

/**
 * @class
 * @mixes Eventful
 */
export default class Controls {
  constructor(plugins) {
    // add event system
    Object.assign(this, Eventful());

    /**
     *@property {HTMLElement} tabbableElement
     */
    /**
     * @property {object[]} plugins
     */
    this.plugins = plugins || [];

    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];

    /**
     * @property {boolean} useNegativeTabIndex
     */
    this.negativeTabIndexAllowed = false;

    // move tabindex to next element
    this.on('nextElement', this.nextElement, this);

    // move tabindex to previous element
    this.on('previousElement', this.previousElement, this);

    // move tabindex for fist element
    this.on('firstElement', this.firstElement, this);

    // move tabindex for last element
    this.on('lastElement', this.lastElement, this);

    // init plugins
    this.initPlugins();
  }

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   *
   * @fires Controls#addElement
   * @public
   */
  addElement(el) {
    this.elements.push(el);

    this.firesEvent('addElement', el);

    if (this.elements.length === 1) { // if first
      this.setTabbable(el);
    }
    else {
      this.setUntabbable(el);
    }
  }

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   * @param {number} position
   *
   * @fires Controls#addElement
   * @public
   */
  insertElementAt(el, position) {
    this.elements.splice(position, 0, el);

    this.firesEvent('addElement', el);

    if (this.elements.length === 1) { // if first
      this.setTabbable(el);
    }
    else {
      this.setUntabbable(el);
    }
  }

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   *
   * @fires Controls#addElement
   * @public
   */
  removeElement(el) {
    this.elements = without([el], this.elements);

    // if removed element was selected
    if (hasTabIndex(el)) {
      this.setUntabbable(el);

      // set first element selected if exists
      if (this.elements[0]) {
        this.setTabbable(this.elements[0]);
      }
    }

    this.firesEvent('removeElement', el);
  }

  /**
   * Returns the number of elements is controlled by this object
   *
   * @return {number}
   */
  count() {
    return this.elements.length;
  }

  /**
   * Fire event
   *
   * @param {string} type
   * @param {HTMLElement|EventTarget} el
   *
   * @public
   */
  firesEvent(type, el) {
    const index = this.elements.indexOf(el);

    return this.fire(type, {
      element: el,
      index: index,
      elements: this.elements,
      oldElement: this.tabbableElement
    });
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {number} index
   *
   * @private
   */
  nextElement({index}) {
    const isLastElement = index === (this.elements.length - 1);
    const nextEl = this.elements[isLastElement ? 0 : (index + 1)];

    this.moveFocus(nextEl);
  }

  /**
   * Sets tabindex on the first element, remove it from all others
   *
   * @private
   */
  firstElement() {
    const element = this.elements[0];
    this.moveFocus(element);
  }

  /**
   * Sets tabindex on the last element, remove it from all others
   *
   * @private
   */
  lastElement() {
    const element = this.elements[this.elements.length - 1];
    this.moveFocus(element);
  }

  /**
   * Selects the element at a position given by argument
   *
   * @param {number} index
   * @public
   */
  setTabbableByIndex(index) {
    const nextEl = this.elements[index];

    if (nextEl) {
      this.setTabbable(nextEl);
    }
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {HTMLElement} el
   * @public
   */
  setTabbable(el) {
    forEach(this.setUntabbable.bind(this), this.elements);
    setTabIndexZero(el);
    this.tabbableElement = el;
  }

  /**
   * Removes tabbability from an element
   *
   * @param {HTMLElement} el
   */
  setUntabbable(el) {
    if (el === document.activeElement) {
      return;
    }

    if (this.negativeTabIndexAllowed) {
      setTabIndexMinusOne(el);
    }
    else {
      removeTabIndex(el);
    }
  }

  /**
   * Ensures tabindexes are updated properly before and after moving focus
   * @param {HTMLElement} element The element to focus
   */
  moveFocus(element) {
    const previousFocused = document.activeElement;

    this.setTabbable(element);
    element.focus();

    // Update the tabindex of the previously active element
    // This is not done by setUntabbable, as it would break screen readers
    if (previousFocused !== element && this.elements.includes(previousFocused)) {
      if (this.negativeTabIndexAllowed) {
        setTabIndexMinusOne(previousFocused);
      }
      else {
        removeTabIndex(previousFocused);
      }
    }
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {number} index
   *
   * @private
   */
  previousElement({index}) {
    const isFirstElement = index === 0;
    const prevEl = this.elements[isFirstElement ? (this.elements.length - 1) : (index - 1)];

    this.moveFocus(prevEl);
  }

  /**
   * Use tabindex="-1" instead of removing tabindex for non-focused elements
   */
  useNegativeTabIndex() {
    this.negativeTabIndexAllowed = true;
    this.elements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        setTabIndexMinusOne(element);
      }
    });
  }

  /**
   * Initializes the plugins
   *
   * @private
   */
  initPlugins() {
    this.plugins.forEach(function (plugin) {
      if (plugin.init !== undefined) {
        plugin.init(this);
      }
    }, this);
  }
}