import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./chat-messages";
import { sendMessage } from "../api/sendMessage";
import type { SendMessageInt } from "../interfaces/sendMessaga.interface";
import type { MessageCustomStyle } from "../interfaces/styles/messageCustomStyle";
import type { FormCustomStyle } from "../interfaces/styles/formCustomStyle";
import { loadConversation } from "../api/loadConversation";
import { ArrayMessageInterface } from "../interfaces/arrayMessage.interface";

@customElement("chat-form")
export class ChatForm extends LitElement {
  static styles = css`
    .chat-form {
      position: absolute;
      bottom: 100%;
      left: 0;
      padding: 5px;
      border-radius: 3px;
      box-shadow: 0 0 10px rgba(0.2, 0.2, 0.2, 0.2);
      margin: 10px;
      background-color: var(--form-bg-color);
      width: 80vw;
      height: 80vh;
      opacity: 0;
      font-family: Arial, Helvetica, sans-serif;
      transform: translateY(20px);
      display: none;
      flex-direction: column;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chat-form.open {
      display: flex;
      animation: fadeIn 0.3s ease forwards;
    }

    .board-message {
      flex: 1;
      min-height: 0;
      justify-content: center;
      background: var(--form-bg-color-board);
      border-radius: 3px;
      margin: 0px 5px 5px 5px;
      overflow: hidden;
    }

    .form-send {
      flex-shrink: 0;
      padding: 5px;
      border-radius: 10px;
    }

    form {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }

    textarea {
      width: 100%;
      min-height: 40px;
      max-height: 100px;
      padding: 8px 40px 8px 15px;
      outline-color: var(--form-color-outline-text-area);
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--form-text-color);
      border: 1px solid #ddd;
      border-radius: 3px;
      background-color: var(--form-bg-color-text-area);
      resize: none;
      line-height: 1.2;
      text-align: justify;
    }

    .clear-button {
      position: absolute;
      right: 8px;
      bottom: 50%;
      transform: translateY(50%);
      background-color: var(--form-bg-color-button);
      color: var(--form-color-text-button);
      border: none;
      border-radius: 3px;
      padding: 6px 10px;
      font-size: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .clear-button.show {
      opacity: 1;
      cursor: pointer;
    }

    .clear-button.disable {
      opacity: 0.5;
    }

    .welcome-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0.3rem;
    }

    .welcome-container p {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1rem;
      font-weight: lighter;
    }

    .welcome {
      margin: 3px 5px 3px 5px;
      padding: 0px 10px 0px 10px;
      width: 40%;
      height: 40px;
      font-size: 16px;
      color: var(--form-color-text-head);
      border-radius: 3px;
      background-color: var(--form-bg-color-head);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
        0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07);
      transform: translateY(-4px);
      transition: all 0.2s ease-in-out;
    }

    @media (max-width: 1024px) {
      .welcome {
        width: 100%;
      }
    }

    @media (min-width: 760px) {
      .chat-form {
        width: 50vw;
        height: 70vh;
      }
    }

    .action-container {
      display: flex;
      gap: 2px;
    }

    .btnDelete {
      border-style: none;
      width: auto;
      height: auto;
      color: red;
      font-size: 2.5rem;
      margin-right: 3px;
      border-radius: 10px;
    }

    .btnDelete:hover {
      color: #ee5858;
    }

    .actions {
      background-color: white;
      border-radius: 3px;
      border-style: none;
      font-size: 1rem;
      height: auto;
      width: auto;
      padding: 1px;
      cursor: pointer;
    }

    .actions:hover {
      transform: translateY(-2px);
      background-color: #e5e5e5;
    }
  `;

  @property({ type: Boolean })
  isOpen: boolean = false;

  @property({ type: String })
  pathStartChat: string = "";
  @property({ type: String })
  pathDeleteChat: string = "";
  @property({ type: String })
  userName: string = "";
  @property({ type: String })
  welcomeName: string = "Test";

  //props custom style form
  @property({ type: Object })
  configFormStyle: FormCustomStyle = {
    form_bg_color: "",
    form_bg_color_board: "",
    form_bg_color_button: "",
    form_bg_color_head: "",
    form_bg_color_text_area: "",
    form_color_outline_text_area: "",
    form_color_text_button: "",
    form_color_text_head: "",
    form_text_color: "",
  };

  //mapeo props custom style
  private cssProperties: Record<string, string> = {
    form_bg_color: "--form-bg-color",
    form_text_color: "--form-text-color",
    form_bg_color_board: "--form-bg-color-board",
    form_bg_color_head: "--form-bg-color-head",
    form_color_text_head: "--form-color-text-head",
    form_bg_color_button: "--form-bg-color-button",
    form_color_text_button: "--form-color-text-button",
    form_color_outline_text_area: "--form-color-outline-text-area",
    form_bg_color_text_area: "--form-bg-color-text-area",
  };

  //props para message
  @property({ type: Object })
  configMessageStyle: MessageCustomStyle = {
    message_bg_color_loading: "",
    message_bg_color_received: "",
    message_bg_color_sender: "",
    message_color_text_loading: "",
    message_color_text_received: "",
    message_color_text_sender: "",
    message_text_color_datetime: "",
  };

  @property({ type: String })
  idConfig: string = "";

  @property({ type: String })
  apiLoadMessages: string = "";
  @property({ type: String })
  token: string = "";
  @property({ type: String })
  baseURL: string = "";

  @state()
  message: string = "";

  @state()
  isThinking: boolean = false;

  @state()
  arrayMessages: ArrayMessageInterface[] = [];

  async connectedCallback() {
    super.connectedCallback();
    await this.loadMessage();
  }

  // <p>Bienvenido a ${this.welcomeName}!</p>
  render() {
    return html`
      <div
        class="chat-form ${this.isOpen ? "open" : ""}"
        @mousedown=${this._handleFormClick}
      >
        <div class="welcome-container">
          <div class="welcome">
            <p>✨Bienvenido a ${this.welcomeName}</p>
            <div class="action-container">
              <button class="actions" title="new chat" @click=${this.onNewChat}>
                🗨️
              </button>
              <button class="actions" title="About">❓</button>
            </div>
          </div>
        </div>
        <div class="board-message">
          <chat-messages
            .messages=${this.arrayMessages}
            .configMessageStyle=${this.configMessageStyle}
          ></chat-messages>
        </div>
        <div class="form-send">
          <form @submit="${this._handleSubmit}">
            <textarea
              placeholder="Escribir mensaje"
              rows="1"
              spellcheck="true"
              .value=${this.message}
              @input=${this._handleInput}
              @keydown=${this._handleKeyDown}
            ></textarea>
            <button
              type="submit"
              .disabled=${this.isThinking}
              class="clear-button ${this.message.trim()
                ? !this.isThinking
                  ? "show"
                  : "disable"
                : ""}"
            >
              ↑
            </button>
          </form>
        </div>
      </div>
    `;
  }

  //watch changes custom styles
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("configFormStyle")) {
      Object.entries(this.cssProperties).forEach(([prop, cssVar]) => {
        const value = this.configFormStyle[prop as keyof FormCustomStyle];
        this.style.setProperty(cssVar, value);
      });
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLTextAreaElement;
    this.message = input.value;
  }

  private async onSendMessage(propms: SendMessageInt) {
    try {
      const res = await sendMessage(
        this.baseURL,
        this.token,
        this.pathStartChat,
        propms
      );
      if (res) {
        localStorage.setItem("idChat", res.idThread);
        return res;
      }

      console.error(res);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  private async sendChatAction() {
    if (this.message.trim()) {
      const newMessage = this.message;
      this.message = "";
      this.arrayMessages = [
        ...this.arrayMessages,
        {
          id: Date.now(),
          text: newMessage.trim(),
          timestamp: new Date(),
          type: "sent",
        },
      ];
      this.isThinking = true;
      this.arrayMessages = [
        ...this.arrayMessages,
        {
          id: Date.now() + 1,
          text: "Pensando...",
          timestamp: new Date(),
          type: "thinking",
        },
      ];

      this.dispatchEvent(
        new CustomEvent("chat-message", {
          detail: { message: newMessage },
        })
      );

      const idChat = localStorage.getItem("idChat");
      const res = await this.onSendMessage({
        idThread: idChat ?? "",
        message: newMessage,
        idConfig: this.idConfig,
      });

      this.arrayMessages = this.arrayMessages
        .filter((msg) => msg.text !== "Pensando...")
        .concat({
          id: Date.now() + 2,
          text: res?.messages[0].content[0].text.value
            ? `✨ ${res.messages[0].content[0].text.value}`
            : "✨ No pude procesar tu solicitud",
          timestamp: new Date(),
          type: "received",
        });
    }
    this.isThinking = false;
  }
  private async _handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.isThinking) {
      return;
    }
    await this.sendChatAction();
  }

  private closeFormOutSide = (e: MouseEvent) => {
    const chatForm = this.shadowRoot?.querySelector(
      ".chat-form"
    ) as HTMLElement;
    if (chatForm && !chatForm.contains(e.target as Node)) {
      this.dispatchEvent(new CustomEvent("form-chat"));
    }
  };

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("isOpen")) {
      if (this.isOpen) {
        document.addEventListener("mousedown", this.closeFormOutSide);
      } else {
        document.removeEventListener("mousedown", this.closeFormOutSide);
      }
    }
  }

  private _handleFormClick(e: MouseEvent) {
    e.stopPropagation();
  }

  private async _handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (this.isThinking) {
        return;
      }
      await this.sendChatAction();
    }
  }

  private loadMessage = async () => {
    try {
      let items: ArrayMessageInterface[] = [];
      const thread = localStorage.getItem("idChat");
      const ruta = `${this.apiLoadMessages}/${this.idConfig}/${thread}`;
      const mjs = await loadConversation(this.baseURL, ruta, this.token);

      if (mjs) {
        mjs.forEach((element) => {
          items.push({
            id: Date.now() + 1,
            text: element.assistant_id
              ? `✨ ${element.content[0].text.value}`
              : element.content[0].text.value,
            timestamp: new Date(),
            type: element.assistant_id ? "received" : "sent",
          });
        });
      }

      this.arrayMessages = items;
    } catch (error) {
      this.arrayMessages = [];
    }
  };

  private onNewChat() {
    localStorage.removeItem("idChat");
    this.arrayMessages = [];
  }
}
