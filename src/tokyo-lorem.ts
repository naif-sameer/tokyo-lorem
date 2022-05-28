import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { arabicProductWords, englishProductWords } from './util';

@customElement('tokyo-lorem')
export class TokyoLorem extends LitElement {
  @property({ type: Number })
  word = 5;

  // paragraph count
  @property({ type: Number })
  paragraph = 1;

  // lorem language
  @property({ type: String })
  language = 'en';

  generateLorem() {
    let _lorem =
      this.language === 'en' ? englishProductWords : arabicProductWords;
    let text = _lorem[0];

    let _loremIndex = 0;
    let getLoremIndex = () => {
      _loremIndex += 1;

      if (_loremIndex >= _lorem.length) {
        _loremIndex = 0;
      }
      return _loremIndex;
    };

    // generate words
    for (let i = 0; i < this.word - 1; i++) {
      text += ` ${_lorem[getLoremIndex()]}`;
    }

    return text + '.';
  }

  render() {
    return html`<div dir="auto">
      ${Array(this.paragraph)
        .fill('')
        .map(() => html`<p>${this.generateLorem()}</p>`)}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tokyo-lorem': TokyoLorem;
  }
}
