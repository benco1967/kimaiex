const doubleTapMaxDelay = 300
let prevTap = {
    time: 0,
    target: null,
}

export const isDoubleTap = event => {
    const touchTap = {
        time: new Date().getTime(),
        target: event.currentTarget,
    };
    const isFastDblTouchTap =
        touchTap.target === prevTap.target &&
        touchTap.time - prevTap.time < doubleTapMaxDelay;

    prevTap = touchTap;

    return isFastDblTouchTap;
}