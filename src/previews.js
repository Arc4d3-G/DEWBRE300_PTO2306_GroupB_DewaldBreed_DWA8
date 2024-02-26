import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { getElement } from './scripts.js';

/**
 * Factory function that accepts a single book object from {@link books} or matches. It can then use
 * the object to create either a preview card element, or set
 * @param {Object} singleBook
 * @returns
 */
export const createPreview = (singleBook) => {
  const preview = {
    author: singleBook.author,
    title: singleBook.title,
    id: singleBook.id,
    image: singleBook.image,
  };

  const toElement = () => {
    let element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', preview.id);

    element.innerHTML = `
                <img
                    class="preview__image"
                    src="${preview.image}"
                />
                
                <div class="preview__info">
                    <h3 class="preview__title">${preview.title}</h3>
                    <div class="preview__author">${authors[preview.author]}</div>
                </div>
            `;
    return element;
  };
  const setOverlay = () => {
    getElement('list-blur').src = singleBook.image;
    getElement('list-image').src = singleBook.image;
    getElement('list-title').innerText = singleBook.title;
    getElement('list-subtitle').innerText = `${authors[singleBook.author]} (${new Date(
      singleBook.published
    ).getFullYear()})`;
    getElement('list-description').innerText = singleBook.description;
  };

  return { preview, toElement, setOverlay };
};

/**
 * Utility function to find a specific element by it's data attribute from an event path
 * array.
 * @param {Array} nodeArray
 * @param {String} dataAttr
 * @returns {Element}
 */
export const getElementFromEventPath = (nodeArray, dataAttr) => {
  let result = null;
  for (const node of nodeArray) {
    if (node.dataset[dataAttr] || node.dataset[dataAttr] === '') {
      result = node;
      break;
    }
  }
  return result;
};
/**
 * @param {Array} nodeArray - accepts any event path array
 * @returns {Object} active -  matching book object
 */
const setSingleBook = (previewId) => {
  let active = null;
  for (const singleBook of books) {
    if (singleBook.id === previewId) {
      active = singleBook;
      break;
    }
  }
  return active;
};

/**
 * Generates data for the preview overlay by creating an array from the event path and then
 * searching through each node until the active node is found. It then checks if the active node
 * has a dataset of "preview", in which case it then searches through the {@link books} object for a
 * matching {@link id} and then inserts the data to the element.
 */
export const generatePreviewOverlayData = (event) => {
  if (event.target.className === 'list__items') {
    return;
  } else {
    const pathArray = Array.from(event.path || event.composedPath());
    const activePreview = getElementFromEventPath(pathArray, 'preview');
    const previewId = activePreview.dataset.preview;
    const singleBook = setSingleBook(previewId);
    if (singleBook) {
      createPreview(singleBook).setOverlay();
    } else return;
  }
};
