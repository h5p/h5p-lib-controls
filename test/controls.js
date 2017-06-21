import Controls from '../src/scripts/controls';

describe("Controls", function () {
  let controls,
    elements;

  beforeEach(function () {
    controls = new Controls();
    elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
  });

  it("should add elements", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));

    // only first element has tabindex
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[2].hasAttribute('tabindex')).toBeFalsy();
  });

  it("should add elements at a given position", function () {
    // add elements to controls
    elements.forEach(el => controls.insertElementAt(el, 0));

    expect(controls.elements[0]).toBe(elements[2]);
    expect(controls.elements[1]).toBe(elements[1]);
    expect(controls.elements[2]).toBe(elements[0]);
  });

  it("should move tabindex on next", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));
    controls.firesEvent('nextElement', elements[0]);

    // only first element has tabindex
    expect(elements[0].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[1].getAttribute('tabindex')).toBe('0');
    expect(elements[2].hasAttribute('tabindex')).toBeFalsy();
  });

  it("should move tabindex on previous", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));
    controls.firesEvent('previousElement', elements[0]);

    // only first element has tabindex
    expect(elements[0].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[1].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[2].getAttribute('tabindex')).toBe('0');
  });

  it("should allow negative tabindexes when 'useNegativeTabIndex' is set", function () {
    controls.useNegativeTabIndex();

    // add elements to controls
    elements.forEach(el => controls.addElement(el));
    controls.firesEvent('previousElement', elements[0]);

    // only first element has tabindex
    expect(elements[0].getAttribute('tabindex')).toBe('-1');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('0');
  });
});