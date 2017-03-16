/**
 * @class
 * @classdesc Keyboard navigation for accessibility support
 */
export default class Mouse {
  constructor() {
    /**
     * @property {boolean} selectability
     */
    this.selectability = true;
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
    this.controls.on('addElement', this.listenForKeyDown, this);
  };

  /**
   * Listens for a keyboard press when element is focused
   *
   * @param {HTMLElement} element
   * @private
   */
  listenForKeyDown({element}) {
    element.addEventListener('click', this.handleClick.bind(this));
    element.addEventListener('drag', this.handleDrag.bind(this));
  };

  /**
   * Handles mouseClick
   *
   * @param {MouseEvent} event Keyboard event
   * @private
   */
  handleClick(event) {
    this.controls.firesEvent('select', event.currentTarget);
  };

  /**
   * Handles key down
   *
   * @param {MouseEvent} event Keyboard event
   * @private
   */
  handleDrag(event) {
    this.controls.firesEvent('drag', event.currentTarget);
  };

  /**
   * Disable possibility to select a word trough click and space or enter
   *
   * @public
   */
  disableSelectability() {
    this.selectability = false;
  };

  /**
   * Enable possibility to select a word trough click and space or enter
   *
   * @public
   */
  enableSelectability() {
    this.selectability = true;
  }
}