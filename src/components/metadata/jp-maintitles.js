import {LitElement, html} from "@polymer/lit-element";
import {connect} from "pwa-helpers/connect-mixin.js";
import {store} from "../../store.js";
import {transformMetadata} from "./jp-metadataJson2Html";

class Maintitles extends connect(store)(LitElement) {
  render(){
    if(this._maintitles){
      const titles = transformMetadata(this._maintitles);
      console.log(titles)
      if(titles.length === 1){

      return html`
        <style>
        :host { display: block; }
        </style>
        <div>
            <span>Titel: </span><span>${titles[0]}</span>
        </div>
      `
    }
    }

  }

  static get properties() {
    return {
      _maintitles: {type: Object}
    }
  }

  stateChanged(state) {
    if(state.metadata.xmlState.json){
      this._maintitles = state.metadata.xmlState.json.mycoreobject.metadata.maintitles;
    }
  }
}

window.customElements.define('jp-maintitles', Maintitles);