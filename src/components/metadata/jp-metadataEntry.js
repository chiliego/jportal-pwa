import { LitElement, html } from '@polymer/lit-element';
import {iterator} from '../../helperTools.js'

class MetadataEntry extends LitElement {
  render(){


    if(this.title !== '' && this.label !== ''){
        return html`
        <style>
        :host { display: block; }
      </style>
        <div>
            <span>${this.label} </span><span>${this.title}</span>
        </div>
      `
    }

  }

  static get properties() {
    return {
      label: { type: String },
      title: { type: String },
    }
  }
}

window.customElements.define('jp-metadata-entry', MetadataEntry);