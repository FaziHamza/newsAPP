const B1 = (t) => {
  return Math.pow(t, 3);
};

const B2 = (t) => {
  return 3 * t * t * (1 - t);
};

const B3 = (t) => {
  return 3 * t * Math.pow(1 - t, 2);
};

const B4 = (t) => {
  return Math.pow(1 - t, 3);
};

// the cubic bezier function
const getScrollTo = ({ percentTimeElapsed, x1, y1, x2, y2 }) => {
  // P0: (0, 0)
  // P1: (x1, y1)
  // P2: (x2, y2)
  // P3: (1, 1)
  // return value between 0 and 1 which is the percentage progress
  return (
    1 -
    (x1 * B1(percentTimeElapsed) +
      y1 * B2(percentTimeElapsed) +
      x2 * B3(percentTimeElapsed) +
      y2 * B4(percentTimeElapsed))
  );
};

export default getScrollTo;
