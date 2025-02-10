import { LoadChatResponse } from "../interfaces/loadChat.response";
import { createChatApi } from "./index";

export const loadConversation = async (
  baseURL: string,
  url: string,
  token: string
) => {
  try {
    const req = createChatApi(baseURL, token);
    const res = await req.get<LoadChatResponse[]>(url);

    return res.data;
  } catch (error: any) {}
};
