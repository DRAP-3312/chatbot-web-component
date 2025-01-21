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
  api-paht-start-chat="http://localhost:3000/api/openai/assistant"
  api-paht-delete-chat="http://localhost:3000/api/openai/thread"
  user-name="Drap"
  welcome-name="Saguaro APP"
></chat-container>
```

| Atributo             | Descripción                              |
| -------------------- | ---------------------------------------- |
| content-button       | Ícono o texto para el botón del chat     |
| api-paht-start-chat  | URL del endpoint para iniciar el chat    |
| api-paht-delete-chat | URL del endpoint para eliminar el chat   |
| user-name            | Nombre del usuario en el chat            |
| welcome-name         | Nombre de bienvenida mostrado en el chat |

## Notas Importantes

- Las URLs de API mostradas son ejemplos locales. Debes proporcionar tus propias rutas de API cuando implementes el componente.
- La personalización de estilos está actualmente en desarrollo y se agregará en futuras versiones.
