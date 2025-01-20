// chat-button.ts
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("chat-button")
export class ChatButton extends LitElement {
  static styles = css`
    .chat-button {
      width: auto;
      height: auto;
      background-color: #154360;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      color: white;
    }

    .chat-button:hover {
      background-color: #313c58;
    }

    div {
      font-size: 2rem;
    }
  `;

  @property({ type: String })
  content: string = "chat";

  render() {
    return html`
      <button class="chat-button" @click="${this._handleClick}">
        <div>${this.content}</div>
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent("toggle-chat"));
  }
}
