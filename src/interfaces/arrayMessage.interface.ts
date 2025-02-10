export interface ArrayMessageInterface {
  id: number;
  text: string;
  timestamp: Date;
  type: "sent" | "received" | "thinking";
}
