import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./chat-messages";
import { sendMessage } from "../api/sendMessage";
import type { SendMessageInt } from "../interfaces/sendMessaga.interface";

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
      background-color: white;
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
      background: #f8f8f8f8;
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
      outline-color: #154360;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      color: #5a5959;
      border: 1px solid #ddd;
      border-radius: 3px;
      resize: none;
      line-height: 1.2;
    }

    .clear-button {
      position: absolute;
      right: 8px;
      bottom: 50%;
      transform: translateY(50%);
      background-color: #154360;
      color: white;
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

    .welcome {
      margin: 3px 5px 3px 5px;
      padding: 0px 10px 0px 10px;
      font-size: 16px;
      color: white;
      border-radius: 3px;
      background-color: #154360;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media (min-width: 760px) {
      .chat-form {
        width: 40vw;
        height: 60vh;
      }
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

    .about {
      background-color: white;
      border-radius: 3px;
      border-style: none;
      height: auto;
      width: auto;
      padding: 1px;
      cursor: pointer;
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

  @state()
  message: string = "";

  @state()
  arrayMessages: Array<{
    id: number;
    text: string;
    timestamp: Date;
    type: "sent" | "received" | "thinking";
  }> = [];

  render() {
    return html`
      <div
        class="chat-form ${this.isOpen ? "open" : ""}"
        @mousedown=${this._handleFormClick}
      >
        <div class="welcome">
          <p>Bienvenido a ${this.welcomeName}!</p>
          <button class="about" title="About">❕</button>
        </div>
        <div class="board-message">
          <chat-messages .messages=${this.arrayMessages}></chat-messages>
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
              class="clear-button ${this.message.trim() ? "show" : ""}"
            >
            ↑
            </button>
          </form>
        </div>
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLTextAreaElement;
    this.message = input.value;
  }

  private async onSendMessage(propms: SendMessageInt) {
    try {
      const res = await sendMessage(this.pathStartChat, propms);
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
        promp: newMessage,
        userName: this.userName,
      });

      this.arrayMessages = this.arrayMessages
        .filter((msg) => msg.text !== "Pensando...")
        .concat({
          id: Date.now() + 2,
          text:
            res?.messages[0].content[0].text.value ??
            "No pude procesar tu solicitud",
          timestamp: new Date(),
          type: "received",
        });
    }
  }
  private async _handleSubmit(e: Event) {
    e.preventDefault();
    await this.sendChatAction();
  }

  // private closeFormOutSide = (e: MouseEvent) => {
  //   const chatForm = this.shadowRoot?.querySelector(
  //     ".chat-form"
  //   ) as HTMLElement;
  //   if (chatForm && !chatForm.contains(e.target as Node)) {
  //     this.dispatchEvent(new CustomEvent("form-chat"));
  //   }
  // };

  // updated(changedProperties: Map<string, any>) {
  //   if (changedProperties.has("isOpen")) {
  //     if (this.isOpen) {
  //       document.addEventListener("mousedown", this.closeFormOutSide);
  //     } else {
  //       document.removeEventListener("mousedown", this.closeFormOutSide);
  //     }
  //   }
  // }

  private _handleFormClick(e: MouseEvent) {
    e.stopPropagation();
  }

  private async _handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await this.sendChatAction();
    }
  }
}
