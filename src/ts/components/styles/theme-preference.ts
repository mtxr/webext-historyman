const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

const themeName = isNotSpecified ? DARK_THEME : (isDarkMode ? DARK_THEME : LIGHT_THEME);

export default themeName;
