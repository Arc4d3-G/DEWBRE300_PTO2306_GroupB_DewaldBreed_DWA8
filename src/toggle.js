import { getElement } from './scripts.js';

/** Toggles the settings overlay either open or closed */
export const handleSettingsToggle = (event) => {
  const overlay = getElement('settings-overlay');
  if (overlay.open) {
    overlay.close();
  } else overlay.showModal();
  getElement('settings-theme').focus();
};

/** Toggles the book preview overlay either open or closed */
export const handlePreviewToggle = (event) => {
  const overlay = getElement('list-active');
  if (event.target.className === 'list__items') return;
  if (overlay.open) {
    overlay.close();
  } else overlay.showModal();
};

/** Toggles the settings overlay either open or closed */
export const handleSearchToggle = (event) => {
  const overlay = getElement('search-overlay');
  if (overlay.open) {
    overlay.close();
  } else overlay.showModal();
  getElement('search-title').focus();
};
