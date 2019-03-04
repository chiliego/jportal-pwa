import {html} from "lit-element";
import {connect} from "pwa-helpers/connect-mixin.js";
import { repeat } from 'lit-html/directives/repeat.js';
import {store} from "../store.js";

// These are the actions needed by this element.
import { sendlogin, loginInput } from '../actions/login.js';

// We are lazy loading its reducer.
import login from '../reducers/login.js';
store.addReducers({
  login
});

import {PageViewElement} from "./page-view-element.js";
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import {SharedStyles} from "./shared-styles.js";

class JPLogin extends connect(store)(PageViewElement) {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    const {errors} = this;
    return html`
        <section>
            <div>
                ${repeat(errors, (error) => html`<p>${error}</p>`)}            
            </div>
             <paper-input id="username" label="Username" 
               @change="${i => store.dispatch(loginInput({username: i.target.value}))}">
             </paper-input>
             <paper-input id="password" label="Password" type="password"
             @change="${i => store.dispatch(loginInput({password: i.target.value}))}">
             </paper-input>
            <paper-button raised class="ipaper-textareandigo" @click="${() => store.dispatch(sendlogin())}">Login</paper-button>
        </section>
       `;
  }

  static get properties() {
    return {
      errors: Array
    }
  }

  stateChanged(state) {
    this.errors = state.login.errors;
  }
}

window.customElements.define('jp-login', JPLogin);