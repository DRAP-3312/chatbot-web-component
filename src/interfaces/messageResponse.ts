export interface MessageResponse {
  idThread: string;
  messages: Message[];
}

export interface Message {
  id: string;
  object: string;
  created_at: number;
  assistant_id: null | string;
  thread_id: string;
  run_id: null | string;
  role: string;
  content: Content[];
  attachments: any[];
  metadata: Metadata;
}

export interface Content {
  type: string;
  text: Text;
}

export interface Text {
  value: string;
  annotations: any[];
}

export interface Metadata {}
