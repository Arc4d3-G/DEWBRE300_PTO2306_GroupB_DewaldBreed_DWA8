import { getElement } from './scripts.js';

/**
 * @param {String} theme - Only accepts "day" or "night"
 */
export const setTheme = (theme) => {
  let themeInput = getElement('settings-theme');
  if (theme === 'night') {
    themeInput.value = 'night';
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    themeInput.value = 'day';
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
};

/**
 * Changes the theme according to the result of the settings form submission
 */
export const handleSettingsSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  setTheme(result.theme);
  getElement('settings-overlay').close();
};
