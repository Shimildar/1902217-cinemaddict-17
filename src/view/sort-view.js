import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSort = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSort(this.#currentSortType);
  }

  setSortTypeChangeHandle = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    const target = evt.target;

    if (target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(target.dataset.sortType);
  };
}
