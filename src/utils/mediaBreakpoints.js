const breakpointsUp = {
  phoneBig: '@media (min-device-width: 400)',
  tablet: '@media (min-device-width: 600)',
};

/* eslint-disable */
export function mediaBreakpointUp(name) {
  return [breakpointsUp[name]];
}
