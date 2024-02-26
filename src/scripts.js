//@ts-check
import { books, genres, authors, BOOKS_PER_PAGE } from './data.js';
import { generatePreviewOverlayData, createPreview } from './previews.js';
import { setTheme, handleSettingsSubmit } from './settings.js';
import { handlePreviewToggle, handleSettingsToggle, handleSearchToggle } from './toggle.js';
import {
  updateShowMoreButton,
  handleShowMoreButton,
  handleSearchSubmit,
  generateGenreHtml,
  generateAuthorHtml,
} from './search.js';

/**
 * Utility function to get elements by data attribute.
 * @param {String} dataAttr - data attribute to search for. (e.g. 'search-overlay' searches for [data-search-overlay])
 * @returns {HTMLElement}
 */
export const getElement = (dataAttr) => {
  const element = document.querySelector(`[data-${dataAttr}]`);
  const isHtmlElement = element instanceof HTMLElement;

  if (!isHtmlElement) {
    throw new Error(`[data-${dataAttr}] not found in HTML`);
  }

  return element;
};

/**
 * Browser preferred theme is detected and theme is set accordingly via {@link setTheme}
 */
const preferredTheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
setTheme(preferredTheme);

/**
 * Initial previews are generated using {@link createPreview} and then appended
 * to the page.
 */
for (let singleBook of books.slice(0, BOOKS_PER_PAGE)) {
  let preview = createPreview(singleBook).toElement();
  getElement('list-items').appendChild(preview);
}

/**
 * Initial Genre list items are generated using {@link generateGenreHtml} and then appended
 * to the search <option> form.
 */
const searchGenres = generateGenreHtml(genres);
getElement('search-genres').appendChild(searchGenres);

/**
 * Initial Genre list items are generated using {@link generateAuthorHtml} and then appended
 * to the search <option> form.
 */
const searchAuthors = generateAuthorHtml(authors);
getElement('search-authors').appendChild(searchAuthors);

/**
 * The "Show More" button's inner html is updated to display the remaining books
 * from the current search.
 */
updateShowMoreButton();

// "Show More" Button EventListeners & handlers
getElement('list-button').addEventListener('click', handleShowMoreButton);

// "Settings" Button EventListeners & handlers
getElement('header-settings').addEventListener('click', handleSettingsToggle);
getElement('settings-cancel').addEventListener('click', handleSettingsToggle);
getElement('settings-form').addEventListener('submit', handleSettingsSubmit);

// "Search" Button EventListeners & handlers
getElement('header-search').addEventListener('click', handleSearchToggle);
getElement('search-cancel').addEventListener('click', handleSearchToggle);
getElement('search-form').addEventListener('submit', handleSearchToggle);
getElement('search-form').addEventListener('submit', handleSearchSubmit);

// "Preview" Button EventListeners & handlers
getElement('list-items').addEventListener('click', handlePreviewToggle);
getElement('list-close').addEventListener('click', handlePreviewToggle);
getElement('list-Items').addEventListener('click', generatePreviewOverlayData);
