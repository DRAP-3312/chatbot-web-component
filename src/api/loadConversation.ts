import { LoadChatResponse } from "../interfaces/loadChat.response";

export const loadConversation = async (url: string) => {
  try {
    const loadThread = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await loadThread.json();

    return data as unknown as LoadChatResponse[];
  } catch (error: any) {}
};
