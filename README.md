# Chatbot Web Component

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Lit](https://img.shields.io/badge/Lit-324FFF?style=for-the-badge&logo=lit&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Un Web Component reutilizable y ligero creado con **Lit** y **TypeScript**, que implementa un chatbot conversacional basado en la **API de OpenAI**. Este es un proyecto de práctica diseñado para aprendizaje y uso casual.

## Características

- **Fácil integración**: Añádelo a cualquier proyecto con una simple etiqueta HTML.
- **Independiente de frameworks**: Compatible con cualquier stack tecnológico.
- **Configuración flexible**: Personaliza el tema, tamaño y endpoint.
- **Responsive y accesible**: Diseño adaptable y compatible con estándares de accesibilidad.

## Tecnologías

- **Lit**: Para un desarrollo eficiente y rápido de Web Components.
- **TypeScript**: Mejora la claridad y seguridad del código.
- **Vite**: Para un entorno de desarrollo rápido y moderno.
- **OpenAI API**: Proporciona la funcionalidad de generación de texto del chatbot.

## Instalación y Uso

### 1. Instalar el paquete

```bash
npm install chat-ts
```

### 2. Importar el componente

## HTML

```html
<!-- En index.html -->
<script type="module" src="./node_modules/chat-ts/dist/chat-ts.js"></script>
```

## Frameworks (Vue, React, Angular, etc)

```typescript
import "chat-ts";
```

### 3. Usar el componente

Agrega la etiqueta del web component donde desees implementar el chat:

```html
<chat-container />
```

## Configuración

### Atributos Requeridos

Todos estos atributos son necesarios para el funcionamiento del componente:

```html
<chat-container
  content-button="❉"
  api-paht-start-chat="http://api"
  api-paht-delete-chat="http://api"
  user-name="Drap"
  welcome-name="Saguaro APP"
></chat-container>
```

### Estilos personalizados disponibles

```html
<chat-container
  .configFormStyle="{
    form_bg_color: '#ffffff',
    form_bg_color_board: '#f8f8f8f8',
    form_bg_color_button: '#154360',
    form_bg_color_head: '#154360',
    form_color_outline_text_area: '#154360',
    form_color_text_button: '#ffffff',
    form_color_text_head: '#ffffff',
    form_text_color: '#3c3b3b',
    form_bg_color_text_area: '#ffffff'
  }"
  .configMessageStyle="{
    message_bg_color_loading: '#e9ecef',
    message_bg_color_received: '#e9ecef',
    message_bg_color_sender: '#154360',
    message_color_text_loading: '#154360',
    message_color_text_received: '#767677',
    message_color_text_sender: '#ffffff',
    message_text_color_datetime: '#e9ecef'
  }"
  .configButtonStyle="{
    botton_bg_color: '#154360',
    button_color_text: '#ffffff',
    button_hover_color: '#313c58'
  }"
></chat-container>
```

| Atributo | Descripción |
|----------|-------------|
| content-button | Ícono o texto para el botón del chat |
| api-paht-start-chat | URL del endpoint para iniciar el chat |
| api-paht-delete-chat | URL del endpoint para eliminar el chat |
| user-name | Nombre del usuario en el chat |
| welcome-name | Nombre de bienvenida mostrado en el chat |
| configFormStyle | Objeto de configuración para estilos del formulario |
| configMessageStyle | Objeto de configuración para estilos de los mensajes |
| configButtonStyle | Objeto de configuración para estilos del botón |

### Estilos Personalizables
#### configFormStyle
| Propiedad | Descripción |
|-----------|-------------|
| form_bg_color | Color de fondo del formulario |
| form_bg_color_board | Color de fondo del tablero |
| form_bg_color_button | Color de fondo del botón |
| form_bg_color_head | Color de fondo del encabezado |
| form_color_outline_text_area | Color del contorno del área de texto |
| form_color_text_button | Color del texto del botón |
| form_color_text_head | Color del texto del encabezado |
| form_text_color | Color del texto general |
| form_bg_color_text_area | Color de fondo del área de texto |

#### configMessageStyle
| Propiedad | Descripción |
|-----------|-------------|
| message_bg_color_loading | Color de fondo durante la carga |
| message_bg_color_received | Color de fondo de mensajes recibidos |
| message_bg_color_sender | Color de fondo de mensajes enviados |
| message_color_text_loading | Color del texto durante la carga |
| message_color_text_received | Color del texto de mensajes recibidos |
| message_color_text_sender | Color del texto de mensajes enviados |
| message_text_color_datetime | Color del texto de fecha y hora |

#### configButtonStyle
| Propiedad | Descripción |
|-----------|-------------|
| botton_bg_color | Color de fondo del botón |
| button_color_text | Color del texto del botón |
| button_hover_color | Color del botón al pasar el cursor |
