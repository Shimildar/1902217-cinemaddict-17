import {createElement} from '../render.js';

const createMostCommentedTitle = () => '<h2 class="films-list__title">Most commented</h2>';

export default class MostCommentedTitleView {
  getTemplate() {
    return createMostCommentedTitle();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
