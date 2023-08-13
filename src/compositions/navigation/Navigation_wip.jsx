import easings from './easings';
import getScrollTo from './bezier';
import styles from './Navigation.module.css';

const getProgress = ({ easingPreset, cubicBezierPoints, duration, runTime }) => {
  const percentTimeElapsed = runTime / duration;

  if (Object.hasOwn(easings, easingPreset)) {
    return easings[easingPreset](percentTimeElapsed);
  } else if (
    cubicBezierPoints &&
    !isNaN(cubicBezierPoints.x1) &&
    !isNaN(cubicBezierPoints.y1) &&
    !isNaN(cubicBezierPoints.x2) &&
    !isNaN(cubicBezierPoints.y2) &&
    cubicBezierPoints.x1 >= 0 &&
    cubicBezierPoints.x2 >= 0
  ) {
    return getScrollTo({
      percentTimeElapsed,
      x1: cubicBezierPoints.x1,
      y1: cubicBezierPoints.y1,
      x2: cubicBezierPoints.x2,
      y2: cubicBezierPoints.y2,
    });
  } else {
    console.error('Please enter a valid easing value');
  }
  return false;
};

//  Returns scroll ammount in pixels
const getTotalScroll = ({
  isWindow,
  elementToScroll,
  elementWidthProp,
  initialScrollPosition,
  scrollLengthProp,
}) => {
  let totalScroll;

  if (isWindow) {
    const documentElement = document.documentElement;
    totalScroll = documentElement.offsetWidth;
  } else {
    totalScroll = elementToScroll[scrollLengthProp] - elementToScroll[elementWidthProp];
  }

  return totalScroll - initialScrollPosition;
};

const smoothScroll = (scrollParams) => {
  const elementToScroll = scrollParams.element;
  const isWindow = elementToScroll === window;
  const scrollDirectionProp = isWindow ? 'scrollX' : 'scrollLeft';
  const elementWithProp = isWindow ? 'innerWidth' : 'clientWidth';
  const scrollLengthProp = 'scrollWidth';
  const initialScrollPosition = elementToScroll[scrollDirectionProp];

  let TotalScroll = getTotalScroll(
    isWindow,
    elementToScroll,
    elementWithProp,
    initialScrollPosition,
    scrollLengthProp
  );

  let startTime;
  const {
    easingPreset,
    cubicBezierPoints,
    duration,
    onAnimationCompleteCallback,
    onRefUpdateCallback,
  } = scrollParams;

  //  The tick function
  const scrollOnNextTick = (timeStamp) => {
    const runTime = timeStamp - startTime;
  };
};

const Navigation = ({ className = '', ...props }) => {
  const list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

  return (
    <div>
      <nav className={`nav ${styles.navigation} ${className}`.trim()} {...props}>
        <ul>
          {list.map((listItem, index) => {
            return <li key={index}>{listItem}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
