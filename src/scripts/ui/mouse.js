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
    this.handleClickBound = this.handleClick.bind(this);
    this.handleDragBound = this.handleDrag.bind(this);
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
    this.controls.on('removeElement', this.unlistenForKeyDown, this);
    
  };

  /**
   * Listens for a keyboard press when element is focused
   *
   * @param {HTMLElement} element
   * @private
   */
  listenForKeyDown({element}) {
    element.addEventListener('click', this.handleClickBound);
    element.addEventListener('drag', this.handleClickBound);
  };

  /** 
   * Remove listeners 
   * 
   * @param {HTMLElement} element
   * @private
  */
  unlistenForKeyDown({element}) {
    element.removeEventListener('click', this.handleClickBound);
    element.removeEventListener('drag', this.handleDragBound);
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