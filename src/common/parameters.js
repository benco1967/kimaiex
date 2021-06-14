export const URL_KIMAI = 'https://temps.lart-du-bois.com';
export const ABSENCE_PROJECT_ID = 1;
export const isAbsenceProject = id => id === ABSENCE_PROJECT_ID;
export const filterActivityByProject = id => activity =>
    (id === ABSENCE_PROJECT_ID && activity.id > 4) ||
    (id !== ABSENCE_PROJECT_ID && activity.id < 5);
export const INSTALLATION_ACTIVITY_ID = 3;
