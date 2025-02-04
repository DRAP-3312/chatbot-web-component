import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { MessageCustomStyle } from "../interfaces/styles/messageCustomStyle";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  type: "sent" | "received" | "thinking";
}

@customElement("chat-messages")
export class ChatMessages extends LitElement {
  static styles = css`
    .message {
      margin: 2px 0;
      padding: 5px 10px;
      border-radius: 3px;
      max-width: 70%;
      min-width: 40px;
      height: fit-content;
      overflow-wrap: break-word;
      font-family: Arial, Helvetica, sans-serif;
      word-break: break-word;

      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      text-align: justify;
      transform: translateY(-4px);
      transition: all 0.2s ease-in-out;
    }

    .messages-container {
      height: 100%;
      overflow-y: auto;
      padding: 8px;
      display: flex;
      flex-direction: column;
      width: auto;
      box-sizing: border-box;
    }

    .message:hover {
      transform: translateY(-6px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
        0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07);
    }

    .message-content {
      width: 100%;
      line-height: 1;
      margin: 0;
      text-align: justify;
    }

    .message-sent {
      background-color: var(--message-bg-color-sender);
      color: var(--message-color-text-sender);
      margin-left: auto;
    }

    .message-received {
      background-color: var(--message-bg-color-received);
      color: var(--message-color-text-received);
      margin-right: auto;
      
    }

    .timestamp {
      font-size: 8px;
      margin-top: 2px;
      opacity: 0.7;
      align-self: flex-end;
      color: var(--message-text-color-datetime);
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
      width: 30px;
      aspect-ratio: 2;
      --_g: no-repeat
        radial-gradient(
          circle closest-side,
          var(--message-color-text-loading) 90%,
          #0000
        );
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
      background-color: var(--message-bg-color-loading);
      padding: 6px 10px;
      border-radius: 3px;
      max-width: 70%;
      min-width: 30px;
      margin-right: auto;
      transform: translateY(-4px);
      transition: all 0.2s ease-in-out;
    }

    .containerLoad:hover {
      transform: translateY(-6px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
        0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07);
    }

    .message-content a {
      color: var(--message-bg-color-sender);
      text-decoration: underline;
      word-break: break-word;
    }

    .message-content a:hover {
      opacity: 0.8;
    }

    .message-content h4 {
      font-size: 1.2em;
      margin: 0.5em 0;
      font-weight: 600;
      line-height: 1.3;
    }
    .message-content .image-container {
      margin: 8px 0;
      max-width: 100%;
      border-radius: 8px;
      overflow: hidden;
    }

    .message-content .image-container img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    .message-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 4px 0;
    }

    /* Estilo para cuando la imagen está cargando */
    .message-content img.loading {
      background-color: #f0f0f0;
      min-height: 200px;
    }

    /* Animación de carga suave */
    .message-content img {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .message-content img.loaded {
      opacity: 1;
    }
    .link-preview {
      margin: 8px 0;
      width: 100%;
    }

    .preview-container {
      display: flex;
      padding: 12px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      text-decoration: none;
      color: inherit;
      align-items: center;
      gap: 12px;
      transition: background-color 0.2s ease;
    }

    .preview-container:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .preview-content {
      flex: 1;
      overflow: hidden;
    }

    .preview-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .preview-url {
      font-size: 0.9em;
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview-icon {
      flex-shrink: 0;
      opacity: 0.7;
    }
  `;

  @property({ type: Array })
  messages: Message[] = [];

  //white-space: pre-wrap;

  //props style messages
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

  //mapeo props custom style
  private cssProperties: Record<string, string> = {
    message_bg_color_sender: "--message-bg-color-sender",
    message_color_text_sender: "--message-color-text-sender",
    message_bg_color_received: "--message-bg-color-received",
    message_color_text_received: "--message-color-text-received",
    message_text_color_datetime: "--message-text-color-datetime",
    message_bg_color_loading: "--message-bg-color-loading",
    message_color_text_loading: "--message-color-text-loading",
  };

  private linkify(text: string): string {
    // Limpiamos las referencias del texto
    const cleanText = text.replace(/\[\d+\.?\d*(?:↑source↓|source)\]/g, "");

    // Procesamos los encabezados
    const withHeaders = cleanText.replace(/^### (.+)$/gm, "<h2>$1</h2>");

    // Procesamos el texto en negrita
    const boldText = withHeaders.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    // Procesamos las URLs con vista previa
    const urlRegex =
      /(https?:\/\/[^\s()<>[\]{}]+(?:\([^\s()<>[\]{}]*\)|[^\s`!()\[\]{};:'".,<>?«»""'']))/g;

    return boldText.replace(urlRegex, (url) => {
      try {
        const cleanUrl = url.replace(/[).,;:]+$/, "");
        new URL(cleanUrl);

        // Si es una imagen, la mostramos directamente
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(cleanUrl)) {
          return `<div class="image-container"><img src="${cleanUrl}" alt="Image" loading="lazy" /></div>`;
        }

        // Para otros enlaces, mostramos una vista previa
        return `
          <div class="link-preview">
            <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="preview-container">
              <div class="preview-content">
                <div class="preview-title">${new URL(cleanUrl).hostname}</div>
                <div class="preview-url">${cleanUrl}</div>
              </div>
              <div class="preview-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </a>
          </div>`;
      } catch {
        return url;
      }
    });
  }

  render() {
    return html`
      <div class="messages-container">
        ${this.messages.map((message) => {
          const messageText = message.text ? this.linkify(message.text) : "";
          return html`
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
                    <div class="message-content">
                      ${unsafeHTML(messageText)}
                    </div>
                    <div class="timestamp">
                      ${new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                `}
          `;
        })}
      </div>
    `;
  }

  //watch changes custom styles
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("configMessageStyle")) {
      Object.entries(this.cssProperties).forEach(([prop, cssVar]) => {
        const value = this.configMessageStyle[prop as keyof MessageCustomStyle];
        this.style.setProperty(cssVar, value);
      });
    }
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

  updated(changedProperties: PropertyValues<this>) {
    this.scrollToBottom();
    super.updated(changedProperties);
    this.scrollToBottom();
    this.addImageLoadHandlers();
  }

  private addImageLoadHandlers() {
    const images = this.shadowRoot?.querySelectorAll(".message-content img");
    images?.forEach((img: any) => {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    });
  }
}
