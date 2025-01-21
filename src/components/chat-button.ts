// chat-button.ts
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ButtonCustomStyle } from "../interfaces/styles/buttonCustomStyle.ts";

@customElement("chat-button")
export class ChatButton extends LitElement {
  static styles = css`
    .chat-button {
      width: auto;
      height: auto;
      background-color: var(--botton-bg-color);
      color: var(--button-color-text);
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    .chat-button:hover {
      background-color: var(--button-hover-color);
    }

    div {
      font-size: 2rem;
    }
  `;

  @property({ type: String })
  content: string = "chat";

  //props custom styles
  @property({ type: Object })
  configButtonStyle: ButtonCustomStyle = {
    botton_bg_color: "",
    button_color_text: "",
    button_hover_color: "",
  };

  private cssProperties: Record<string, string> = {
    botton_bg_color: "--botton-bg-color",
    button_color_text: "--button-color-text",
    button_hover_color: "--button-hover-color",
  };

  render() {
    return html`
      <button class="chat-button" @click="${this._handleClick}">
        <div>${this.content}</div>
      </button>
    `;
  }

  //watch changes custom styles
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("configButtonStyle")) {
      Object.entries(this.cssProperties).forEach(([prop, cssVar]) => {
        const value = this.configButtonStyle[prop as keyof ButtonCustomStyle];
        this.style.setProperty(cssVar, value);
      });
    }
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent("toggle-chat"));
  }
}
