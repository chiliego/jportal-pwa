import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';



class CustomTemplate extends PolymerElement {

  static get template() { return html`
    <template id="special-template" preserve-content>
      <div>I am very special.</div>
      <textarea name="content" id="editor">
            &lt;p&gt;Here goes the initial content of the editor.&lt;/p&gt;
        </textarea>
    </template>`
  }

  ready() {
    super.ready();
    // retrieve the nested template
    let template = this.shadowRoot.querySelector('#special-template');

    //
    for (let i=0; i<10; i++) {
      this.shadowRoot.appendChild(document.importNode(template.content, true));
    }
  }
}

customElements.define("special-template", CustomTemplate);