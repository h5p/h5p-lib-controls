import Controls from '../../src/scripts/controls';
import AriaDrop from '../../src/scripts/aria/drop.js';

describe("Aria Drop", function () {
  let ariaDrop,
    controls,
    elements;

  beforeEach(function () {
    ariaDrop = new AriaDrop();
    controls = new Controls([ariaDrop]);
    elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];

    // sets drop effect to none on first element
    elements[0].setAttribute('aria-dropeffect', 'none');
  });

  it("should only change drop zones on setting move effect", function () {
    ariaDrop.setAllToMove();

    // only first element has tabindex
    expect(elements[0].hasAttribute('aria-dropeffect')).toBeTruthy();
    expect(elements[1].hasAttribute('aria-dropeffect')).toBeFalsy();
    expect(elements[2].hasAttribute('aria-dropeffect')).toBeFalsy();
  });
});