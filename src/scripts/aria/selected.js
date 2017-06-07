import {setAttribute, removeAttribute, attributeEquals} from 'h5p-sdk/src/scripts/utils/elements';

export default class Choice {
  constructor(){
    /**
     * @type {function}
     * @param {HTMLElement} el
     */
    this.removeAriaSelected = removeAttribute('aria-selected');
    /**
     * @type {function}
     * @param {HTMLElement} el
     */
    this.addAriaSelected = setAttribute('aria-selected', 'true');
  }

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
    this.controls.on('select', this.select, this);
  };

  /**
   * Toggles aria-selected on element
   *
   * @param {HTMLElement} element
   * @param {HTMLElement} oldElement
   */
  select({element, oldElement}) {
    if (element === oldElement) {
      this.removeAriaSelected(element);
    }
    else {
      this.addAriaSelected(element);
    }
  }
}