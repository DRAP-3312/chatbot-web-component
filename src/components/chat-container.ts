import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./chat-button.ts";
import "./form-chat.ts";
import type { FormCustomStyle } from "../interfaces/styles/formCustomStyle.ts";
import type { MessageCustomStyle } from "../interfaces/styles/messageCustomStyle.ts";
import type { ButtonCustomStyle } from "../interfaces/styles/buttonCustomStyle.ts";

@customElement("chat-container")
export class ChatContainer extends LitElement {
  static styles = css`
    .container {
      position: fixed;
      left: 20px;
      bottom: 20px;
      z-index: 1000;
    }

    .container-button {
      text-align: center;
    }

    .container-button.close{
      display: none;
    }
  `;

  @property({ type: Boolean })
  isOpen: boolean = false;
  @property({ type: String })
  contentButton: string = "🌟";
  @property({ type: Boolean })
  chatModal: boolean = false;
  @property({ type: String })
  apiPahtStartChat: string = "";
  @property({ type: String })
  apiPahtDeleteChat: string = "";
  @property({ type: String })
  userName: string = "";
  @property({ type: String })
  welcomeName: string = "";
  @property({ type: String })
  tokenAuth: string = "";

  //config custom style form
  @property({ type: Object })
  configFormStyle: FormCustomStyle = {
    form_bg_color: "#ffffff",
    form_bg_color_board: "#f8f8f8f8",
    form_bg_color_button: "#154360",
    form_bg_color_head: "#154360",
    form_color_outline_text_area: "#154360",
    form_color_text_button: "#ffffff",
    form_color_text_head: "#ffffff",
    form_text_color: "#3c3b3b",
    form_bg_color_text_area: "#ffffff",
  };

  //config custom style messages
  @property({ type: Object })
  configMessageStyle: MessageCustomStyle = {
    message_bg_color_loading: "#e9ecef",
    message_bg_color_received: "#e9ecef",
    message_bg_color_sender: "#154360",
    message_color_text_loading: "#154360",
    message_color_text_received: "#767677",
    message_color_text_sender: "#ffffff",
    message_text_color_datetime: "#e9ecef",
  };

  //config custom style button
  @property({ type: Object })
  configButtonStyle: ButtonCustomStyle = {
    botton_bg_color: "#154360",
    button_color_text: "#ffffff",
    button_hover_color: "#313c58",
  };

  @property({ type: String })
  idConfig: string = "";

  @property({ type: String })
  apiLoadMessages: string = "";

  @property({ type: String })
  baseURL: string = "";

  render() {
    return html`
      <div class="container">
        <chat-form
          .idConfig="${this.idConfig}"
          .isOpen="${this.isOpen}"
          .pathStartChat=${this.apiPahtStartChat}
          .pathDeleteChat=${this.apiPahtDeleteChat}
          .userName=${this.userName}
          .welcomeName=${this.welcomeName}
          @form-chat=${this.closeModalChat}
          .configFormStyle=${this.configFormStyle}
          .configMessageStyle=${this.configMessageStyle}
          .apiLoadMessages=${this.apiLoadMessages}
          .token=${this.tokenAuth}
          .baseURL=${this.baseURL}
        ></chat-form>
        <div class="container-button ${this.isOpen ? 'close': ''}">
          <chat-button
            .configButtonStyle=${this.configButtonStyle}
            .content=${this.contentButton}
            @toggle-chat="${this.toggleChat}"
          >
          </chat-button>
        </div>
      </div>
    `;
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  closeModalChat() {
    this.isOpen = false;
  }
}
