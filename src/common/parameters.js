export const URL_KIMAI = 'https://temps.lart-du-bois.com';
export const ABSENCE_ACTIVITY_ID = 8;
export const isAbsenceActivity = id => id === ABSENCE_ACTIVITY_ID;
export const filterActivityByProject = id => activity =>
    (id === ABSENCE_ACTIVITY_ID && activity.id > 4) ||
    (id !== ABSENCE_ACTIVITY_ID && activity.id < 5);
