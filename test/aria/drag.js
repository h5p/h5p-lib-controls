import Controls from '../../src/scripts/controls';
import Keyboard from '../../src/scripts/ui/keyboard';
import Drag from '../../src/scripts/aria/drag';

describe("Aria Drag", function () {
  let controls,
    keyboard,
    elements,
    ariaDrag;

  beforeEach(function () {
    ariaDrag = new Drag();
    keyboard = new Keyboard();
    controls = new Controls([keyboard, ariaDrag]);
    elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
  });

  it("should add elements correctly", function () {
    // add elements to controls via ariaDrag, to get aria-grabbed set
    elements.forEach(el => ariaDrag.addElement(el));

    // needs aria-grabbed attribute to indicate grabability
    expect(elements[0].hasAttribute('aria-grabbed')).toBeTruthy();
    expect(elements[1].hasAttribute('aria-grabbed')).toBeTruthy();
    expect(elements[2].hasAttribute('aria-grabbed')).toBeTruthy();
  });

  it("should indicate grabbed", function () {
    // add elements to controls
    elements.forEach(el => ariaDrag.addElement(el));

    // select element 1
    controls.firesEvent('select', elements[1]);

    // only element 1 should have aria-grabbed
    expect(elements[0].getAttribute('aria-grabbed')).toBe('false');
    expect(elements[1].getAttribute('aria-grabbed')).toBe('true');
    expect(elements[2].getAttribute('aria-grabbed')).toBe('false');
  });
});