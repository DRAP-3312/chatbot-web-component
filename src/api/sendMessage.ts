import { createChatApi } from "./index";
import type { MessageResponse } from "../interfaces/messageResponse";
import type { SendMessageInt } from "../interfaces/sendMessaga.interface";

export const sendMessage = async (
  baseURL: string,
  token: string,
  url: string,
  propm: SendMessageInt
) => {
  try {
    const req = createChatApi(baseURL, token);
    const res = await req.post<MessageResponse>(url, propm);

    return res.data;
  } catch (error) {
    throw error;
  }
};
