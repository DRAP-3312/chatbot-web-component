import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./chat-button.ts";
import "./form-chat.ts";

@customElement("chat-container")
export class ChatContainer extends LitElement {
  static styles = css`
    .container {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 1000;
    }
  `;

  @property({ type: Boolean })
  isOpen: boolean = false;

  @property({ type: String })
  contentButton: string = "chat";

  @property({ type: String })
  apiPahtStartChat: string = "";
  @property({ type: String })
  apiPahtDeleteChat: string = "";
  @property({type:String})
  userName: string = ''

  render() {
    return html`
      <div class="container">
        <chat-form
          .isOpen="${this.isOpen}"
          .pathStartChat=${this.apiPahtStartChat}
          .pathDeleteChat=${this.apiPahtDeleteChat}
          .userName=${this.userName}
        ></chat-form>
        <chat-button
          .content=${this.contentButton}
          @toggle-chat="${this.toggleChat}"
        >
        </chat-button>
      </div>
    `;
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}
