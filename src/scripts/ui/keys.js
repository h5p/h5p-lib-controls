export const Keys = {
  ENTER: 13,
  SPACE: 32,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};

export const isKey = (event, key, control = {ctrl: false, shift: false}) => {
  if (event.which !== key) {
    return false;
  }

  if (control.ctrl && !event.ctrlKey) {
    return false;
  }

  if (control.shift && !event.shiftKey) {
    return false;
  }

  return true;
};
