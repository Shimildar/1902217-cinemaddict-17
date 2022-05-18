import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import NoFilmMessageView from '../view/no-film-view.js';
import {render, remove} from '../framework/render.js';
import {ExtraContainerTitles} from '../const.js';
import {updateItem} from '../utils/films.js';
import {getFilterType} from '../utils/filter.js';
import {sortDateDown, sortRatingDown} from '../utils/sort.js';
import {SortType, FilterType} from '../const.js';
import FilmPresenter from './film-presenter.js';
import FilmView from '../view/film-view.js';

const PER_STEP_FILM_COUNT = 5;
const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;

export default class BoardPresenter {
  #boardContainer = null;
  #boardContainerHeader = null;
  #boardContainerMain = null;
  #boardContainerFooter = null;
  #filmsModel = null;
  #commentsModel = null;
  #boardFilms = [];
  #boardComments = [];

  #renderedFilmCount = PER_STEP_FILM_COUNT;
  #filmPresenter = new Map();
  #currentFilterType = FilterType.DEFAULT;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];
  #filteredFilms = null;

  #filterComponent = null;
  #sortComponent = new SortView();
  #noFilmMessage = new NoFilmMessageView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #showMoreButton = new ShowMoreButtonView();
  #topRatedContainer = new ExtraContainerView(ExtraContainerTitles.TOP_RATED);
  #mostCommentedContainer = new ExtraContainerView(ExtraContainerTitles.MOST_COMMENTED);

  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardContainerHeader = this.#boardContainer.querySelector('.header');
    this.#boardContainerMain = this.#boardContainer.querySelector('.main');
    this.#boardContainerFooter = this.#boardContainer.querySelector('.footer');
    this.#boardFilms = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#commentsModel.comments];

    this.#renderBoard();
  };

  #renderBoard = () => {
    render(new UserProfileView(this.#boardFilms), this.#boardContainerHeader);
    this.#renderFilter(this.#boardFilms);

    if (this.#boardFilms.length === 0) {
      render(this.#noFilmMessage, this.#boardContainerMain);
      this.#renderFooter();
      return;
    } else {
      this.#renderSort();
      render(this.#filmsContainer, this.#boardContainerMain);
      render(this.#filmsList, this.#filmsContainer.element);
      this.#renderFilmList(this.#boardFilms);
      this.#renderTopFilmList();
      this.#renderMostCommentedFilmList();
    }

    this.#renderFooter();
  };

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = PER_STEP_FILM_COUNT;
    remove(this.#showMoreButton);
  };

  #handleClearPopup = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilter = (films) => {
    this.#filterComponent = new FilterView(films);
    render(this.#filterComponent, this.#boardContainerMain);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainerMain);
  };

  #renderFilm = (filmCard, container) => {
    const filmCardPresenter = new FilmPresenter(container, this.#boardComments, this.#handleFilmChange, this.#handleClearPopup);
    filmCardPresenter.init(filmCard);
    this.#filmPresenter.set(filmCard.id, filmCardPresenter);
  };

  #renderFilms = (filmCards, from, to) => {
    filmCards.slice(from, to)
      .forEach((filmCard) => this.#renderFilm(filmCard, this.#filmsList.filmsListContainer));
  };

  #renderFilmList = (filmCards) => {
    this.#renderFilms(filmCards, 0, (Math.min(filmCards.length, PER_STEP_FILM_COUNT)));

    if (filmCards.length > PER_STEP_FILM_COUNT) {
      this.#renderShowMoreButton(filmCards);
    }
  };

  #renderTopFilmList = () => {
    render(this.#topRatedContainer, this.#filmsContainer.element);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmView(this.#boardFilms[i + 6]), this.#topRatedContainer.filmsListContainer);// Временно [i + 6]
    }
  };

  #renderMostCommentedFilmList = () => {
    render(this.#mostCommentedContainer, this.#filmsContainer.element);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmView(this.#boardFilms[i + 3]), this.#mostCommentedContainer.filmsListContainer);// Временно [i + 3]
    }
  };

  #renderShowMoreButton = (filmCards) => {

    const handleShowMoreButtonClick = () => {
      this.#renderFilms(filmCards, this.#renderedFilmCount, (this.#renderedFilmCount + PER_STEP_FILM_COUNT));

      this.#renderedFilmCount += PER_STEP_FILM_COUNT;

      if (this.#renderedFilmCount >= filmCards.length) {
        remove(this.#showMoreButton);
      }
    };

    render(this.#showMoreButton, this.#filmsList.element);
    this.#showMoreButton.setClickHandler(handleShowMoreButtonClick);
  };

  #renderFooter = () => {
    render(new FooterStatisticsView(this.#boardFilms.length), this.#boardContainerFooter);
  };
}

