import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  type: "sent" | "received" | "thinking";
}

@customElement("chat-messages")
export class ChatMessages extends LitElement {
  static styles = css`
    .messages-container {
      height: 100%;
      overflow-y: auto;
      padding: 8px;
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    .message {
      margin: 2px 0;
      padding: 6px 10px;
      border-radius: 15px;
      max-width: 70%;
      min-width: 40px;
      height: fit-content;
      overflow-wrap: break-word;
      word-break: break-word;
      white-space: pre-wrap;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .message-content {
      width: 100%;
      line-height: 1.2;
      margin: 0;
    }

    .message-sent {
      background-color: #7839cd;
      color: white;
      margin-left: auto;
    }

    .message-received {
      background-color: #e9ecef;
      color: #2c2c2c;
      margin-right: auto;
    }

    .timestamp {
      font-size: 0.65rem;
      margin-top: 2px;
      opacity: 0.7;
      align-self: flex-end;
    }

    .message.short {
      padding: 4px 8px;
    }

    .message.short .message-content {
      line-height: 1.1;
    }

    @media (max-width: 480px) {
      .message {
        max-width: 85%;
      }

      .messages-container {
        padding: 5px;
      }
    }

    .loader {
      width: 40px;
      aspect-ratio: 2;
      --_g: no-repeat radial-gradient(circle closest-side, #7839cd 90%, #0000);
      background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
      background-size: calc(100% / 3) 50%;
      animation: l3 1s infinite linear;
    }
    @keyframes l3 {
      20% {
        background-position: 0% 0%, 50% 50%, 100% 50%;
      }
      40% {
        background-position: 0% 100%, 50% 0%, 100% 50%;
      }
      60% {
        background-position: 0% 50%, 50% 100%, 100% 0%;
      }
      80% {
        background-position: 0% 50%, 50% 50%, 100% 100%;
      }
    }

    .containerLoad {
      background-color: #e9ecef;
      padding: 6px 10px;
      border-radius: 15px;
      max-width: 70%;
      min-width: 40px;
      margin-right: auto;
    }
  `;

  @property({ type: Array })
  messages: Message[] = [];

  render() {
    return html`
      <div class="messages-container">
        ${this.messages.map(
          (message) => html`
            ${message.type === "thinking"
              ? html`<div class="containerLoad">
                  <div class="loader"></div>
                </div>`
              : html`
                  <div
                    class="message ${message.type === "sent"
                      ? "message-sent"
                      : "message-received"}"
                  >
                    <div class="message-content">${message.text}</div>
                    <div class="timestamp">
                      ${new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                `}
          `
        )}
      </div>
    `;
  }

  scrollToBottom() {
    const container = this.shadowRoot?.querySelector(".messages-container");
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  updated() {
    this.scrollToBottom();
  }
}
