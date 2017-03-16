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
    expect(elements[0].hasAttribute('tabindex')).toBeTruthy();
    expect(elements[1].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[2].hasAttribute('tabindex')).toBeFalsy();
  });

  it("should move tabindex on next", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));
    controls.firesEvent('nextElement', elements[0]);

    // only first element has tabindex
    expect(elements[0].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[1].hasAttribute('tabindex')).toBeTruthy();
    expect(elements[2].hasAttribute('tabindex')).toBeFalsy();
  });

  it("should move tabindex on previous", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));
    controls.firesEvent('previousElement', elements[0]);

    // only first element has tabindex
    expect(elements[0].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[1].hasAttribute('tabindex')).toBeFalsy();
    expect(elements[2].hasAttribute('tabindex')).toBeTruthy();
  });
});