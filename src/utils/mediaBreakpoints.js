const breakpointsUp = {
  phoneBig: '@media (min-device-width: 400)',
};

/* eslint-disable */
export function mediaBreakpointUp(name) {
  return [breakpointsUp[name]];
}
