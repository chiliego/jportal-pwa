import {LitElement, html} from "@polymer/lit-element";
import {connect} from "pwa-helpers/connect-mixin.js";
import {store} from "../../store.js";
import {stream} from "../../helperTools";
import {metadataSelector, isEditingSelector} from "../../reducers/metadata";
import {saveData} from "../../actions/metadata";

const mcrMetaLangTextHandler = (metaLangTextObj) => {
  let result = [];
  Object.keys(metaLangTextObj)
    .filter(key => key !== 'attr')
    .map(key => metaLangTextObj[key])
    .forEach(val => stream(val)
      .filter(e => e.attr.inherited === '0')
      .map(e => e.textContent)
      .reduce((txt, arr) => arr.push(txt), result)
    );

  return result;
}

class MCRMetaLangText extends connect(store)(LitElement) {
  render(){
    if(this._metadataField && this._metadataField.attr.class === "MCRMetaLangText"){
      let metaLangTextObj = this._metadataField;

      return html`
         <style>
        :host { display: block; }
        </style>
        ${Object.keys(metaLangTextObj)
          .filter(key => key !== 'attr')
          .map(key => metaLangTextObj[key])
          .map(item => item instanceof Array ? item : [item])
          .reduce((item,arr) => [...arr, ...item], [])
          .filter(item => item.attr.inherited === '0')
          .map(item => html`
            <div>
            <span>${this.name}: </span>
            <span ?hidden="${this._isEditing}">${item.textContent}</span>
            <input ?hidden="${!this._isEditing}"
                value="${item.textContent}"
                data-item="${item}"
                @change="${e => this._onChange(e)}"></input>
            </div>
          `)
        }
        
      `
    }

  }

  static get properties() {
    return {
      name: {type: String},
      _metadataField: {type: Object},
      _isEditing: Boolean
    }
  }

  stateChanged(state) {
    this._metadataField = metadataSelector(state)(this.name);
    this._isEditing = isEditingSelector(state);
  }

  _onChange(e) {
    e.currentTarget.dataset['item'].textContent = e.currentTarget.value

    store.dispatch(saveData(this.name, this._metadataField))
  }
}

window.customElements.define('mcr-meta-lang-text', MCRMetaLangText);