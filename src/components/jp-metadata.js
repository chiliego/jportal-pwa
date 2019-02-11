import {html} from "@polymer/lit-element";
import {connect} from "pwa-helpers/connect-mixin.js";
import {store} from "../store.js";
import {isEditingSelector} from "../reducers/metadata";

// These are the actions needed by this element.
import {
  fetchMetadata,
  editData,
  saveData
} from '../actions/metadata.js';

// We are lazy loading its reducer.
import metadata from '../reducers/metadata.js';

import './metadata/mcr-meta-lang-text'

store.addReducers({
  metadata,
});

import {PageViewElement} from "./page-view-element.js";
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import {SharedStyles} from "./shared-styles.js";

class JPMetadata extends connect(store)(PageViewElement) {
  render() {
    return html`
        ${SharedStyles}
        <section>
          <mcr-meta-lang-text name="maintitles"></mcr-meta-lang-text>  
          <mcr-meta-lang-text name="subtitles"></mcr-meta-lang-text>  
          <mcr-meta-lang-text name="hidden_templates"></mcr-meta-lang-text>
          <button
                @click="${this._editing ? this._saveData : this._editData}"
                title="${this._editing ? 'Speichern' : 'Daten editieren'}">
                ${this._editing ? 'Speichern' : 'Daten editieren'}
            </button>
        </section>
       `;
  }

  static get properties() {
    return {
      _editing: Boolean
    }
  }

  _editData(){
    console.log("Edit Data");
    store.dispatch(editData())
  }

  _saveData(){
    console.log("Save Data");
    store.dispatch(saveData())
  }

  stateChanged(state) {
    this._editing = isEditingSelector(state);
    console.log(state);
  }
}

window.customElements.define('jp-metadata', JPMetadata);

export {fetchMetadata}