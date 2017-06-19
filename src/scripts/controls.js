import { setAttribute, removeAttribute, hasAttribute } from 'h5p-sdk/src/scripts/utils/elements';
import { forEach, without } from 'h5p-sdk/src/scripts/utils/functional';
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
  addElement(el) {
    this.elements.push(el);

    this.firesEvent('addElement', el);

    if (this.elements.length === 1) { // if first
      this.setTabbable(el);
    }
    else if(this.negativeTabIndexAllowed) {
      setTabIndexMinusOne(el);
    }
  };

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   *
   * @fires Controls#addElement
   * @public
   */
  removeElement(el) {
    this.elements = without([el], this.elements);

    // if removed element was selected
    if(hasTabIndex(el)) {
      this.setUntabbable(el);

      // set first element selected if exists
      if(this.elements[0]) {
        this.setTabbable(this.elements[0]);
      }
    }

    this.firesEvent('removeElement', el);
  };

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

    this.setTabbable(nextEl);
    nextEl.focus();
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
    if(this.negativeTabIndexAllowed) {
      setTabIndexMinusOne(el);
    }
    else {
      removeTabIndex(el);
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

    this.setTabbable(prevEl);
    prevEl.focus();
  }

  /**
   * Use tabindex="-1" instead of removing tabindex for non-focused elements
   */
  useNegativeTabIndex() {
    this.negativeTabIndexAllowed = true;
    this.elements.forEach(element => {
      if(!element.hasAttribute('tabindex')){
        setTabIndexMinusOne(element);
      }
    })
  }

  /**
   * Initializes the plugins
   *
   * @private
   */
  initPlugins() {
    this.plugins.forEach(function(plugin){
      if(plugin.init !== undefined){
        plugin.init(this);
      }
    }, this);
  }
}