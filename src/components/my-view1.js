/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
      paper-input.search {
      /*margin-bottom: 14px;*/
      /*--primary-text-color: #01579B;*/
      /*!*--paper-input-container-color: black;*!*/
      /*--paper-input-container-focus-color: black;*/
      /*--paper-input-container-invalid-color: black;*/
      /*border: 1px solid #BDBDBD;*/
      /*border-radius: 5px;*/

      /*!* Reset some defaults *!*/
      --paper-input-container: { padding: 0;};
      --paper-input-container-underline: { display: none; height: 0;};
      --paper-input-container-underline-focus: { display: none; };

      /*!* New custom styles *!*/
      /*--paper-input-container-input: {*/
        /*box-sizing: border-box;*/
        /*font-size: inherit;*/
        /*padding: 4px;*/
      /*};*/
      /*--paper-input-container-input-focus: {*/
        /*background: rgba(0, 0, 0, 0.1);*/
      /*};*/
      /*--paper-input-container-input-invalid: {*/
        /*background: rgba(255, 0, 0, 0.3);*/
      /*};*/
      /*--paper-input-container-label: {*/
        /*top: -8px;*/
        /*left: 4px;*/
        /*background: white;*/
        /*padding: 2px;*/
        /*font-weight: bold;*/
      /*};*/
      /*--paper-input-container-label-floating: {*/
        /*width: auto;*/
      /*};*/
      }
      `
    ];
  }

  render() {
    return html`
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
        <paper-input class="search" label="Suche">
        <iron-icon icon="search" slot="prefix"></iron-icon>
        <div slot="suffix">@email.com</div>
       </paper-input>
      </section>
      
      <section>
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci. Maecenas sollicitudin diam in diam efficitur cursus. Morbi sollicitudin in justo tincidunt placerat. Integer tincidunt elementum nisi, eu ornare dolor lacinia eget. Fusce pulvinar massa eget odio placerat, commodo molestie ipsum tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse porttitor id purus eu cursus. Suspendisse arcu nulla, mattis vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet est sed, malesuada metus. Cras nec enim vel nibh tincidunt euismod ut et enim. Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis. Cras tempor rutrum est. Praesent sollicitudin ligula at laoreet placerat. Praesent tortor dui, semper in sapien non, pharetra luctus turpis.</p>
      </section>
      <section>
        <p>Vestibulum at est ex. Aenean id ligula id nibh dictum laoreet. Etiam non semper erat. Pellentesque eu justo rhoncus diam vulputate facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat metus ex, vel fringilla massa tincidunt sit amet. Nunc facilisis bibendum tristique. Mauris commodo, dolor vitae dapibus fermentum, odio nibh viverra lorem, eu cursus diam turpis et sapien. Nunc suscipit tortor a ligula tincidunt, id hendrerit tellus sollicitudin.</p>
      </section>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
