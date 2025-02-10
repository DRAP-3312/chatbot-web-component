export interface LoadChatResponse {
  id: string;
  object: Object;
  created_at: number;
  assistant_id: null | string;
  thread_id: string | null;
  run_id: null | string;
  role: Role;
  content: Content[];
  attachments: any[];
  metadata: Metadata;
}

export interface Content {
  type: Type;
  text: Text;
}

export interface Text {
  value: string;
  annotations: Annotation[];
}

export interface Annotation {
  type: string;
  text: string;
  start_index: number;
  end_index: number;
  file_citation: FileCitation;
}

export interface FileCitation {
  file_id: string;
}

export enum Type {
  Text = "text",
}

export interface Metadata {}

export enum Object {
  ThreadMessage = "thread.message",
}

export enum Role {
  Assistant = "assistant",
  User = "user",
}
