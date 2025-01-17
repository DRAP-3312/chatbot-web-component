import type { DeleteMessage } from "../interfaces/deleteMessage.interface";
import type { DeleteSuccess } from "../interfaces/deleteMessage.response";

export const deleteMessage = async (url: string, body: DeleteMessage) => {
  try {
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data: DeleteSuccess = await res.json();
    return data;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};
