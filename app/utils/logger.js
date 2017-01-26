export default {
  debug(data) {
    console.debug(data);
  },

  groupCollapsed(groupName) {
    if (console.groupCollapsed) {
      console.groupCollapsed(groupName);
    } else {
      console.log(`===== ${groupName} =====`);
    }
  },

  groupEnd(groupName) {
    if (console.groupEnd) {
      console.groupEnd();
    } else {
      console.log(`===== End ${groupName} =====`);
    }
  },
};
