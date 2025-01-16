import type { MessageResponse } from "../interfaces/messageResponse";
import type { SendMessageInt } from "../interfaces/sendMessaga.interface";

export const sendMessage = async (url: string, propm: SendMessageInt) => {
  const apiEndPoit = url;
  try {
    const res = await fetch(apiEndPoit, {
      method: "POST",
      body: JSON.stringify(propm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data: MessageResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};
