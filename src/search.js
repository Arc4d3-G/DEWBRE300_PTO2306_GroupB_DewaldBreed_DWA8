import { books, genres, BOOKS_PER_PAGE } from './data.js';
import { getElement } from './scripts.js';
import { createPreview } from './previews.js';

let page = 1;
let matches = books;

/**
 * Function sets the "Show More" button to display the remaining results
 */
export const updateShowMoreButton = () => {
  let remainingResults = null;
  let buttonElement = getElement('list-button');
  if (matches.length - page * BOOKS_PER_PAGE > 0) {
    remainingResults = matches.length - page * BOOKS_PER_PAGE;
  } else remainingResults = 0;
  buttonElement.innerText = `Show more (${remainingResults})`;
  buttonElement.disabled = !(remainingResults > 0);
};

/**
 * When "Show More" button is clicked it will generate 36 more previews (see {@link generatePreviews})
 * and append them to the page, and then increment {@link page}'s value.
 * The {@link updateShowMoreButton} function is then invoked to update the remaining results
 * displayed.
 */
export const handleShowMoreButton = (event) => {
  page += 1;
  const rangeStart = (page - 1) * BOOKS_PER_PAGE;
  const rangeEnd = page * BOOKS_PER_PAGE;

  for (let singleBook of matches.slice(rangeStart, rangeEnd)) {
    let preview = createPreview(singleBook).toElement();
    getElement('list-items').appendChild(preview);
  }

  updateShowMoreButton();
};

/**
 * A function that generates a list of genres as <option> elements
 *
 * @param {Object} targetObject - accepts any object containing genre data.
 *
 * @returns {DocumentFragment} genreFragment - Returns the newly created document fragment to be appended.
 */
export const generateGenreHtml = (targetObject) => {
  const genreFragment = document.createDocumentFragment();
  const GenreElement = document.createElement('option');
  GenreElement.value = 'any';
  GenreElement.innerText = 'All Genres';
  genreFragment.appendChild(GenreElement);

  for (let [id, name] of Object.entries(targetObject)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreFragment.appendChild(element);
  }
  return genreFragment;
};

/**
 * A function that generates a list of Authors as <option> elements.
 *
 * @param {Object} targetObject - accepts any object containing Author data.
 *
 * @returns {DocumentFragment} authorFragment - Returns the newly created document fragment to be appended.
 */
export const generateAuthorHtml = (targetObject) => {
  const authorsFragment = document.createDocumentFragment();
  const authorsElement = document.createElement('option');
  authorsElement.value = 'any';
  authorsElement.innerText = 'All Authors';
  authorsFragment.appendChild(authorsElement);

  for (let [id, name] of Object.entries(targetObject)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFragment.appendChild(element);
  }
  return authorsFragment;
};

/**
 * A function that creates and returns an object consisting of all the {@link singleBook} of {@link books}
 * which match the search parameters.
 *
 * @param {Object} filters - This accepts an object containing data from the search form,
 * defined as {@link filters} by {@link handleSearchSubmit} in scripts.js
 *
 * @returns {Object} result - This is used by {@link handleSearchSubmit} to define {@link searchResult}.
 */
const generateSearchResults = (filters) => {
  let result = [];
  filters.title = filters.title.trim();
  for (const singleBook of books) {
    const titleMatch =
      filters.title === '' || singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || singleBook.author === filters.author;
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of singleBook.genres) {
      if (genres[singleGenre] === genres[filters.genre]) {
        genreMatch = true;
      }
    }
    if (titleMatch && authorMatch && genreMatch) {
      result.push(singleBook);
    }
  }

  return result;
};

/**
 * A function that creates an object from the search form submission results and assigns it to
 * {@link filters}. It then uses filters as a parameter for {@link generateSearchResults} and assigns
 * it's return value as {@link searchResult} which is then used in {@link generatePreviewHtml} to generate
 * preview html to be appended to the page. Lastly {@link updateShowMoreButton} is invoked to update the
 * remaining results displayed.
 */
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const searchResult = generateSearchResults(filters);

  if (searchResult.length < 1) {
    getElement('list-message').classList.add('list__message_show');
  } else getElement('list-message').classList.remove('list__message_show');

  getElement('list-items').innerHTML = '';

  for (let singleBook of searchResult.slice(0, BOOKS_PER_PAGE)) {
    let preview = createPreview(singleBook).toElement();
    getElement('list-items').appendChild(preview);
  }

  // getElement('list-items').appendChild(generatePreviews(searchResult, 1));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  matches = searchResult;
  page = 1;
  console.log(searchResult);

  updateShowMoreButton();
};
