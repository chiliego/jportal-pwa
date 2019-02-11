import {LitElement, html} from "@polymer/lit-element";
import {connect} from "pwa-helpers/connect-mixin.js";
import {store} from "../../store.js";
import {transformMetadata} from "./jp-metadataJson2Html";

class MetadataField extends connect(store)(LitElement) {
  render(){
    if(this._metadataField){
      const titles = transformMetadata(this._metadataField);
      console.log(titles)
      if(titles.length === 1){

      return html`
        <style>
        :host { display: block; }
        </style>
        <div>
            <span>${this.name}: </span><span>${titles[0]}</span>
        </div>
      `
    }
    }

  }

  static get properties() {
    return {
      name: {type: String},
      _metadataField: {type: Object}
    }
  }

  stateChanged(state) {
    if(state.metadata.xmlState.json && this.name){
      this._metadataField = state.metadata.xmlState.json.mycoreobject.metadata[this.name];
    }
  }
}

window.customElements.define('jp-metadata-field', MetadataField);